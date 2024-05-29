import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TextInput({ onAddText, textList }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amountValue, setAmountValue] = useState("");

  const handleTextChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자를 제거합니다.
    setAmountValue(value);
  };

  const formatAmount = (value) => {
    // 천 단위로 구분된 문자열로 포맷팅합니다.
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && selectedDate && amountValue) {
      onAddText(inputValue, selectedDate, amountValue);
      setInputValue("");
      setSelectedDate(new Date());
      setAmountValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-input">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select date"
        required
        // 날짜 형식 설정
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />

      <input
        type="text"
        value={formatAmount(amountValue)}
        onChange={handleAmountChange}
        placeholder="원"
        required
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleTextChange}
        placeholder="항목을 입력해주세요"
        required
      />
      <button className="btn" type="submit">Add</button>

    </form>
  );
}

export default TextInput;
