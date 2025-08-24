import React, { useState } from "react";

const steps = [
  { id: 1, question: "Giới tính của bạn?", options: ["Nam", "Nữ", "Khác"] },
  { id: 2, question: "Độ tuổi của bạn?", options: ["<18", "18-25", "26-35", "36+"] },
  { id: 3, question: "Mức giá mong muốn?", options: ["<100k", "100k-300k", "300k+"] },
  { id: 4, question: "Ẩm thực quốc gia bạn thích?", options: ["Việt Nam", "Hàn Quốc", "Nhật Bản", "Âu"] },
  { id: 5, question: "Món ăn yêu thích?", options: ["Phở", "Lẩu", "Cơm tấm", "Sushi"] },
];

export default function SurveyForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({}); // lưu state câu trả lời

  const handleSelect = (option) => {
    setAnswers({
      ...answers,
      [steps[step].id]: option, // lưu theo id step
    });
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Thông tin người dùng:", answers);
    // TODO: Gọi API lưu vào DB ở đây
  };

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden border rounded-2xl shadow-lg p-6 bg-white">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${step * 100}%)` }}
      >
        {steps.map((s, index) => (
          <div key={index} className="w-full flex-shrink-0 px-6">
            <h2 className="text-xl font-semibold mb-4">{s.question}</h2>
            <div className="space-y-2">
              {s.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={`w-full border rounded-lg py-2 ${
                    answers[s.id] === opt
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            disabled={!answers[steps[step].id]} // bắt buộc chọn trước khi next
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-500 text-white"
          >
            Hoàn tất
          </button>
        )}
      </div>
    </div>
  );
}
