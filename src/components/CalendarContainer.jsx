import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.$active ? "blue" : "gray")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
`;

function CalendarContainer({ onDateChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    const selectedDate = new Date(); // 새로운 Date 객체를 만듭니다.
    selectedDate.setMonth(index - 1); // 선택한 월의 인덱스로 월을 설정합니다.
    setActiveIndex(index);
    onDateChange(selectedDate); // 선택한 월을 상위 컴포넌트로 전달합니다.
  };

  // 월별 박스 생성을 위한 배열 생성
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <Container className="calendar">
      {months.map((month) => (
        <StyledBox
          key={month}
          $active={activeIndex === month}
          onClick={() => handleClick(month)}
        >
          {month}월
        </StyledBox>
      ))}
    </Container>
  );
}

export default CalendarContainer;
