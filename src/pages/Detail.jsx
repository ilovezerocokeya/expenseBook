import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = ({ texts }) => {
    const { id } = useParams();

    if (!texts || texts.length === 0) {
      return <div>Loading...</div>;
    }
  

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      
      return <div>Invalid ID</div>;
    }
  
    // `id`를 사용하여 해당 아이템 찾기
    const item = texts.find((text) => text.id === parsedId);
  
    // 아이템이 없는 경우
    if (!item) {
      return <div>Item not found</div>;
    }
  return (
    <div>
      <h1>Detail 페이지</h1>
      <div>
        <p>Date: {item.date}</p>
        <p>Amount: {item.amount}원</p>
        <p>Text: {item.text}</p>
      </div>
    </div>
  );
};

export default Detail;
