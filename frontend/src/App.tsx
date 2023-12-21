import { Header } from "./components";
import { IProps } from "./interfaces";

const App = ({ children }: IProps): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default App;
