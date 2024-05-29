import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    ${reset}

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-family: 'Noto Sans KR', sans-serif;
    color: white;
    font-size: 15px;
  }

  .title{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;

  }
  .allList {
  border: 1px solid #ccc;
  padding: 10px;
}

.sub-title {
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.list {
  list-style-type: none;
  padding: 0;
  color: white;
}

.list li {
  margin-bottom: 5px;
}

  
`;
    


export default GlobalStyle
