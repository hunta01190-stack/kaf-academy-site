// 트라이얼 수업 설정 — 가격, 환불, 결제 방법을 여기서 한 번에 바꿉니다.
// 홈페이지, 예약 페이지, 확인 이메일이 모두 이 값을 사용합니다.

const trialConfig = {
  // 가격 (달러)
  price: 20, // 대여 장비 포함
  priceWithOwnGear: 15, // 본인 스케이트 + 보호장비가 있는 경우
  enrollmentCredit: 20, // 트라이얼 후 정규 수업 등록 시 할인 금액

  // 환불: 수업 며칠 전까지 가능한지
  refundDaysBefore: 7,

  // 일정 안내 문구
  scheduleText: "Every Saturday at 7:00 PM · March – July 2027",
  maxStudents: 6,
  locationNote:
    "Location to be announced (Johns Creek / Alpharetta area). We will email you the exact park before your class.",

  // 결제 방법 — 실제 정보로 바꿔 주세요. 빈 값("")이면 화면과 이메일에서 숨겨집니다.
  zelle: "", // 예: "contact@kafinline.com" 또는 전화번호
  venmo: "", // 예: "@KAF-Academy"
};

// notes 맨 앞에 붙여서 예약 정보와 함께 저장되는 장비 표시
export const GEAR_PREFIX_OWN = "[Own gear: YES]";
export const GEAR_PREFIX_RENTAL = "[Own gear: NO - rental]";

export function trialPrice(hasOwnGear) {
  return hasOwnGear ? trialConfig.priceWithOwnGear : trialConfig.price;
}

export function paymentLines() {
  const lines = [];
  if (trialConfig.zelle) lines.push(`Zelle: ${trialConfig.zelle}`);
  if (trialConfig.venmo) lines.push(`Venmo: ${trialConfig.venmo}`);
  return lines;
}

export default trialConfig;
