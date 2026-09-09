import nodemailer from "nodemailer";
import { createAdminClient } from "../../../utils/supabase/admin";

export const runtime = "nodejs";

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeString) {
  const [hourString, minuteString] = timeString.split(":");

  let hour = Number(hourString);
  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minuteString} ${period}`;
}

export async function POST(request) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return Response.json(
        {
          success: false,
          message: "Booking ID is required.",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 실제 Supabase 예약정보를 서버에서 직접 조회
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select(`
        id,
        child_name,
        child_age,
        parent_name,
        phone,
        email,
        preferred_language,
        notes,
        status,
        emails_sent_at,
        trial_class:trial_classes (
          class_date,
          start_time,
          location_name,
          location_address
        )
      `)
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      console.error("Booking lookup failed:", bookingError);

      return Response.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    if (booking.status !== "confirmed") {
      return Response.json(
        {
          success: false,
          message: "Booking is not confirmed.",
        },
        { status: 400 }
      );
    }

    // 같은 예약으로 이메일을 반복 발송하지 않음
    if (booking.emails_sent_at) {
      return Response.json({
        success: true,
        alreadySent: true,
        message: "Booking emails were already sent.",
      });
    }

    const trialClass = booking.trial_class;

    if (!trialClass) {
      return Response.json(
        {
          success: false,
          message: "Trial class information not found.",
        },
        { status: 404 }
      );
    }

    const formattedDate = formatDate(trialClass.class_date);
    const formattedTime = formatTime(trialClass.start_time);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // KAF에게 새 예약 알림
    await transporter.sendMail({
      from: `"KAF Academy Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: booking.email,
      subject: `New Trial Booking - ${booking.child_name}`,
      text: `
NEW KAF ACADEMY TRIAL BOOKING

STUDENT
Name: ${booking.child_name}
Age: ${booking.child_age}

PARENT / GUARDIAN
Name: ${booking.parent_name}
Phone: ${booking.phone}
Email: ${booking.email}

TRIAL CLASS
Date: ${formattedDate}
Time: ${formattedTime}
Location: ${trialClass.location_name}
Address: ${trialClass.location_address || "N/A"}

Preferred Language: ${booking.preferred_language}

Notes:
${booking.notes || "None"}

--------------------------------
KAF Academy
contact@kafinline.com
      `,
    });

    // 부모님에게 예약 확인
    await transporter.sendMail({
      from: `"KAF Academy" <${process.env.SMTP_USER}>`,
      to: booking.email,
      replyTo: process.env.SMTP_USER,
      subject: "Your KAF Academy Trial Class Reservation",
      text: `
Hello ${booking.parent_name},

Your child's trial class has been successfully reserved.

TRIAL CLASS DETAILS

Student:
${booking.child_name}

Date:
${formattedDate}

Time:
${formattedTime}

Location:
${trialClass.location_name}

Address:
${trialClass.location_address || ""}

PLEASE BRING

- Inline skates
- Helmet
- Knee pads
- Elbow pads
- Wrist guards

Please arrive a few minutes before the scheduled class time.

If you have any questions, simply reply to this email.

Thank you,

KAF Academy
Kids Are the Future
contact@kafinline.com
      `,
    });

    // 이메일 발송 완료 기록
    const { error: updateError } = await supabase
      .from("bookings")
      .update({
        emails_sent_at: new Date().toISOString(),
      })
      .eq("id", booking.id);

    if (updateError) {
      console.error("Failed to mark emails as sent:", updateError);
    }

    return Response.json({
      success: true,
      message: "Booking emails sent successfully.",
    });
  } catch (error) {
    console.error("Trial booking email failed:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to send booking emails.",
      },
      { status: 500 }
    );
  }
}