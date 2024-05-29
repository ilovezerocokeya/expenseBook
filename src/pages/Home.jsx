import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import CalendarContainer from "../components/CalendarContainer";
import { Link } from "react-router-dom";
import Modal from "../components/Modal"; // 모달 컴포넌트를 가져옵니다.

const Home = () => {
  const [texts, setTexts] = useState(() => {
    const saveTexts = localStorage.getItem("texts");
    return saveTexts ? JSON.parse(saveTexts) : [];
  });
  const [editingText, setEditingText] = useState(null); // 편집 중인 텍스트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonthTexts, setSelectedMonthTexts] = useState([]); // 선택한 월에 해당하는 리스트
  const [allTexts, setAllTexts] = useState([]);

  useEffect(() => {
    localStorage.setItem("texts", JSON.stringify(texts));
  }, [texts]);

  useEffect(() => {
    const filteredTexts = texts.filter(
      (text) => new Date(text.date).getMonth() === selectedDate.getMonth()
    );
    setSelectedMonthTexts(filteredTexts);
  }, [selectedDate, texts]);

  useEffect(() => {
    setAllTexts(texts);
  }, [texts]);

  const onAddText = (text, date, amount) => {
    const newText = {
      id: Date.now(),
      text: text,
      date: date.toISOString().split("T")[0], // 날짜를 문자열로 변환하여 저장합니다.
      amount: amount,
    };
    setTexts((prevTexts) => [...prevTexts, newText]);
  };

  const deleteText = (id) => {
    setTexts((prev) => prev.filter((text) => text.id !== id));
  };

  const openModal = (id) => {
    const textToEdit = texts.find((text) => text.id === id);
    if (textToEdit) {
      setEditingText(textToEdit);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setEditingText(null);
    setIsModalOpen(false);
  };

  const saveEditedText = (editedText) => {
    setTexts((prev) =>
      prev.map((text) =>
        text.id === editingText.id ? { ...text, text: editedText } : text
      )
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <main>
      <div className="main">
        <h1 className="title">지출내역서</h1>
        <TextInput onAddText={onAddText} textList={texts} />
        <ul className="finder">
          {selectedMonthTexts.map((item) => (
            <li key={item.id}>
              <Link to={`/detail/${item.id}`}>
                {item.date}, {item.amount}원, {item.text}
              </Link>
              <button className="btn" onClick={() => deleteText(item.id)}>❌</button>
              <button className="btn" onClick={() => openModal(item.id)}>✏️</button>
            </li>

          ))}
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={saveEditedText}
            initialText={editingText ? editingText.text : ""}
          />
        </ul>
      </div>
      <CalendarContainer
        className="calendar"
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      <div className="allList">
        <h2 className="sub-title">전체 리스트</h2>
        <ul className="list">
          {allTexts.map((item) => (
            <li key={item.id}>
              {item.date}, {item.amount}원, {item.text}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
