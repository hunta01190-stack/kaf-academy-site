"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function TrialPage() {
  const [supabase] = useState(() => createClient());

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [reservationSummary, setReservationSummary] = useState(null);

  const [form, setForm] = useState({
    childName: "",
    childAge: "",
    parentName: "",
    phone: "",
    email: "",
    preferredLanguage: "English",
    notes: "",
  });

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    setLoadingClasses(true);

    const { data, error } = await supabase.rpc(
      "get_trial_class_availability"
    );

    if (error) {
      console.error(error);
      setMessage("Unable to load available trial classes.");
      setLoadingClasses(false);
      return;
    }

    setClasses(data || []);
    setLoadingClasses(false);
  }

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function formatDate(dateString) {
    const date = new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }

  function formatTime(timeString) {
    const [hourString, minuteString] = timeString.split(":");

    let hour = Number(hourString);
    const minute = minuteString;
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${period}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!selectedClass) {
      setMessage("Please select a trial class first.");
      return;
    }

    if (Number(form.childAge) < 4) {
      setMessage("Trial classes are available for children ages 4 and up.");
      return;
    }

    setReservationSummary({
  classDate: selectedClass.class_date,
  classTime: selectedClass.start_time,
  locationName: selectedClass.location_name,
  locationAddress: selectedClass.location_address,
  email: form.email,
});

    setSubmitting(true);

    const { data, error } = await supabase.rpc(
      "reserve_trial_booking",
      {
        p_trial_class_id: selectedClass.id,
        p_child_name: form.childName,
        p_child_age: Number(form.childAge),
        p_parent_name: form.parentName,
        p_phone: form.phone,
        p_email: form.email,
        p_preferred_language: form.preferredLanguage,
        p_notes: form.notes || null,
      }
    );

    if (error) {
      console.error(error);

      if (error.message?.includes("CLASS_FULL")) {
        setMessage(
          "This class just became full. Please select another available class."
        );
        await loadClasses();
      } else {
        setMessage(
          "We could not complete your booking. Please check your information and try again."
        );
      }

      setSubmitting(false);
      return;
    }

    setSuccess(true);

    const bookingId = data?.[0]?.booking_id;

let emailSent = false;

if (bookingId) {
  try {
    const emailResponse = await fetch("/api/trial-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId,
      }),
    });

    const emailResult = await emailResponse.json();

    emailSent =
      emailResponse.ok &&
      emailResult.success;
  } catch (emailError) {
    console.error(
      "Booking confirmation email failed:",
      emailError
    );
  }
}

setReservationSummary((current) =>
  current ? { ...current, emailSent } : current
);

setMessage(
  emailSent
    ? `Your trial class is reserved. A confirmation email has been sent to you. ${
        data?.[0]?.spots_left ?? ""
      } spot(s) remain in this class.`
    : `Your trial class is reserved. ${
        data?.[0]?.spots_left ?? ""
      } spot(s) remain in this class. We could not send the confirmation email, but your reservation is confirmed.`
);
    setForm({
      childName: "",
      childAge: "",
      parentName: "",
      phone: "",
      email: "",
      preferredLanguage: "English",
      notes: "",
    });

    await loadClasses();

    setSelectedClass(null);

    setSubmitting(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fbf7ef",
        color: "#071525",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #d8dee5",
        }}
      >
        <div
          className="shell"
          style={{
            minHeight: "82px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontWeight: "900",
              letterSpacing: ".08em",
            }}
          >
            <img
              src="/kaf-logo.png"
              alt="KAF Academy"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />

            <span>KAF ACADEMY</span>
          </a>

          <a
            href="/"
            style={{
              fontSize: "13px",
              fontWeight: "800",
            }}
          >
            ← BACK TO HOME
          </a>
        </div>
      </header>

      <section
        style={{
          background: "#0a2d52",
          color: "#ffffff",
          padding: "70px 0",
        }}
      >
        <div className="shell">
          <p
            style={{
              color: "#ff6800",
              fontSize: "12px",
              fontWeight: "900",
              letterSpacing: ".16em",
            }}
          >
            KAF ACADEMY
          </p>

          <h1
            style={{
              margin: "14px 0 16px",
              fontSize: "clamp(42px, 6vw, 76px)",
              lineHeight: "1",
              letterSpacing: "-.045em",
            }}
          >
            BOOK A TRIAL CLASS
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: 0,
              color: "#d7e0e9",
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >
            Choose an available class, enter your information,
            and reserve your child&apos;s spot.
          </p>
        </div>
      </section>

      <section
        className="shell"
        style={{
          paddingTop: "70px",
          paddingBottom: "90px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "55px",
            alignItems: "start",
          }}
          className="trial-grid"
        >
          <div>
            <p
              style={{
                color: "#ff6800",
                fontSize: "12px",
                fontWeight: "900",
                letterSpacing: ".14em",
              }}
            >
              STEP 1
            </p>

            <h2
              style={{
                fontSize: "32px",
                margin: "8px 0 30px",
              }}
            >
              Available Trial Classes
            </h2>

            {loadingClasses && <p>Loading available classes...</p>}

            {!loadingClasses && classes.length === 0 && (
              <p>No trial classes are currently available.</p>
            )}

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {classes.map((trialClass) => {
                const selected =
                  selectedClass?.id === trialClass.id;

                return (
                  <button
                    key={trialClass.id}
                    type="button"
                    disabled={trialClass.is_full}
                    onClick={() => setSelectedClass(trialClass)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "24px",
                      borderRadius: "8px",
                      border: selected
                        ? "2px solid #0a2d52"
                        : "1px solid #d8dee5",
                      background: trialClass.is_full
                        ? "#eeeeee"
                        : "#ffffff",
                      cursor: trialClass.is_full
                        ? "not-allowed"
                        : "pointer",
                      opacity: trialClass.is_full ? 0.65 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            display: "block",
                            fontSize: "19px",
                          }}
                        >
                          {formatDate(trialClass.class_date)}
                        </strong>

                        <span
                          style={{
                            display: "block",
                            marginTop: "6px",
                            color: "#ff6800",
                            fontWeight: "900",
                          }}
                        >
                          {formatTime(trialClass.start_time)}
                        </span>
                      </div>

                      <strong
                        style={{
                          color: trialClass.is_full
                            ? "#c62828"
                            : "#0a2d52",
                        }}
                      >
                        {trialClass.is_full
                          ? "FULL"
                          : `${trialClass.spots_left} SPOTS LEFT`}
                      </strong>
                    </div>

                    <p
                      style={{
                        margin: "0 0 15px",
                        lineHeight: "1.6",
                      }}
                    >
                      {trialClass.location_name}
                      <br />
                      <span
                        style={{
                          color: "#66717d",
                          fontSize: "14px",
                        }}
                      >
                        {trialClass.location_address}
                      </span>
                    </p>

                    <div
                      style={{
                        borderTop: "1px solid #e2e6ea",
                        paddingTop: "14px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                        fontWeight: "800",
                      }}
                    >
                      <span>
                        {trialClass.booked_count} /{" "}
                        {trialClass.capacity} booked
                      </span>

                      <span>
                        {selected
                          ? "SELECTED"
                          : trialClass.is_full
                          ? "UNAVAILABLE"
                          : "SELECT"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p
              style={{
                color: "#ff6800",
                fontSize: "12px",
                fontWeight: "900",
                letterSpacing: ".14em",
              }}
            >
              STEP 2
            </p>

      <h2
  style={{
    fontSize: "32px",
    margin: "8px 0 30px",
  }}
>
  {success ? "Reservation Complete" : "Parent Information"}
</h2>

{success && reservationSummary && (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #d8dee5",
      borderRadius: "8px",
      padding: "36px",
      marginBottom: "25px",
    }}
  >
    <div
      style={{
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        background: "#eaf7ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        fontWeight: "900",
        marginBottom: "22px",
      }}
    >
      ✓
    </div>

    <p
      style={{
        color: "#ff6800",
        fontSize: "12px",
        fontWeight: "900",
        letterSpacing: ".14em",
        marginBottom: "10px",
      }}
    >
      TRIAL CLASS RESERVED
    </p>

    <h3
      style={{
        fontSize: "28px",
        margin: "0 0 24px",
      }}
    >
      Your spot is confirmed.
    </h3>

    <div
      style={{
        background: "#0a2d52",
        color: "#ffffff",
        padding: "22px",
        borderRadius: "6px",
        lineHeight: "1.7",
        marginBottom: "24px",
      }}
    >
      <strong>
        {formatDate(reservationSummary.classDate)}
      </strong>
      <br />

      {formatTime(reservationSummary.classTime)}
      <br />

      {reservationSummary.locationName}
      <br />

      <span style={{ color: "#d7e0e9" }}>
        {reservationSummary.locationAddress}
      </span>
    </div>

    <p
      style={{
        lineHeight: "1.7",
        marginBottom: "22px",
      }}
    >
      {reservationSummary.emailSent ? (
        <>
          A confirmation email has been sent to:
          <br />
          <strong>{reservationSummary.email}</strong>
        </>
      ) : (
        <>
          Your reservation is confirmed, but we could not send the
          confirmation email to <strong>{reservationSummary.email}</strong>.
          Please save this page or contact{" "}
          <a href="mailto:contact@kafinline.com">
            <strong>contact@kafinline.com</strong>
          </a>
          .
        </>
      )}
    </p>

    <div
      style={{
        borderTop: "1px solid #e2e6ea",
        paddingTop: "22px",
        marginBottom: "28px",
      }}
    >
      <strong>PLEASE BRING</strong>

      <ul
        style={{
          lineHeight: "1.9",
          paddingLeft: "20px",
          marginBottom: 0,
        }}
      >
        <li>Inline skates</li>
        <li>Helmet</li>
        <li>Knee pads</li>
        <li>Elbow pads</li>
        <li>Wrist guards</li>
      </ul>
    </div>

    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <a
        href="/"
        style={{
          flex: "1",
          minWidth: "180px",
          minHeight: "54px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a2d52",
          color: "#ffffff",
          fontWeight: "900",
          fontSize: "13px",
        }}
      >
        BACK TO HOME
      </a>

      <button
        type="button"
        onClick={() => {
          setSuccess(false);
          setMessage("");
          setReservationSummary(null);
        }}
        style={{
          flex: "1",
          minWidth: "180px",
          minHeight: "54px",
          border: "1px solid #0a2d52",
          background: "#ffffff",
          color: "#0a2d52",
          fontWeight: "900",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        BOOK ANOTHER TRIAL
      </button>
    </div>
  </div>
)}
            {selectedClass && (
              <div
                style={{
                  background: "#0a2d52",
                  color: "#ffffff",
                  padding: "20px 22px",
                  borderRadius: "6px",
                  marginBottom: "25px",
                }}
              >
                <strong>YOUR SELECTED CLASS</strong>

                <p
                  style={{
                    margin: "10px 0 0",
                    lineHeight: "1.6",
                  }}
                >
                  {formatDate(selectedClass.class_date)}
                  <br />
                  {formatTime(selectedClass.start_time)}
                  <br />
                  {selectedClass.location_name}
                </p>
              </div>
            )}

            <form
  onSubmit={handleSubmit}
  hidden={success}
              style={{
                background: "#ffffff",
                border: "1px solid #d8dee5",
                padding: "30px",
                borderRadius: "8px",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "20px",
                  fontWeight: "800",
                }}
              >
                Child&apos;s Name *

                <input
                  name="childName"
                  value={form.childName}
                  onChange={updateForm}
                  required
                  style={inputStyle}
                />
              </label>

              <label
                style={{
                  display: "block",
                  marginBottom: "20px",
                  fontWeight: "800",
                }}
              >
                Child&apos;s Age *

                <input
                  name="childAge"
                  type="number"
                  min="4"
                  value={form.childAge}
                  onChange={updateForm}
                  required
                  style={inputStyle}
                />
              </label>

              <label
                style={{
                  display: "block",
                  marginBottom: "20px",
                  fontWeight: "800",
                }}
              >
                Parent / Guardian Name *

                <input
                  name="parentName"
                  value={form.parentName}
                  onChange={updateForm}
                  required
                  style={inputStyle}
                />
              </label>

              <label
                style={{
                  display: "block",
                  marginBottom: "20px",
                  fontWeight: "800",
                }}
              >
                Phone Number *

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateForm}
                  required
                  style={inputStyle}
                />
              </label>

              <label
                style={{
                  display: "block",
                  marginBottom: "20px",
                  fontWeight: "800",
                }}
              >
                Email Address *

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  required
                  style={inputStyle}
                />
              </label>

              <label
                style={{
                  display: "block",
                  marginBottom: "20px",
                  fontWeight: "800",
                }}
              >
                Preferred Language *

                <select
                  name="preferredLanguage"
                  value={form.preferredLanguage}
                  onChange={updateForm}
                  style={inputStyle}
                >
                  <option value="English">English</option>
                  <option value="Korean">Korean</option>
                </select>
              </label>

              <label
                style={{
                  display: "block",
                  marginBottom: "24px",
                  fontWeight: "800",
                }}
              >
                Optional Notes

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={updateForm}
                  rows="4"
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />
              </label>

              {message && (
                <p
                  style={{
                    padding: "14px 16px",
                    background: success ? "#eaf7ee" : "#fff1ed",
                    border: success
                      ? "1px solid #8bc59b"
                      : "1px solid #f4ab92",
                    lineHeight: "1.5",
                  }}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedClass}
                style={{
                  width: "100%",
                  minHeight: "58px",
                  border: 0,
                  borderRadius: "3px",
                  background:
                    submitting || !selectedClass
                      ? "#a7adb3"
                      : "#ff6800",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "900",
                  cursor:
                    submitting || !selectedClass
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {submitting
                  ? "RESERVING..."
                  : "CONFIRM TRIAL BOOKING"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 850px) {
          .trial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: "9px",
  minHeight: "48px",
  padding: "12px 14px",
  border: "1px solid #ccd3da",
  borderRadius: "4px",
  background: "#ffffff",
  font: "inherit",
};