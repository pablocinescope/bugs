import RegisterForm from "./components/RegisterForm";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #eeeeee
`;

function App() {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
}

export default App;
