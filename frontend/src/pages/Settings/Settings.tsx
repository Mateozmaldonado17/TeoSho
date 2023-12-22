import { Alert, Button, Label, TextInput } from "keep-react";
import { XCircle } from "phosphor-react";
import { useBaseFetch } from "../../services";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces";
import { isExpiredToken } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AccountButtonGroup } from "../../components";

const Settings = (): JSX.Element => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [userInfo, setUserInfo] = useState<IUser>();
  const { get, loading, put } = useBaseFetch();

  const getUserInfo = async () => {
    const getInfo = await get("/user/me");
    if (getInfo) {
      setUserInfo(getInfo);
      setFullName(getInfo.name);
      setEmail(getInfo.email);
    }
  };

  const changeUserInfo = async () => {
    setErrors([]);
    const update = await put("/user", {
      email: email,
      name: fullName,
    });
    if (update.data && update.token) {
      localStorage.setItem("token", update.token);
    }
    if (!update?.message) {
      setErrors([update.error]);
    }
    if (update?.message) {
      setErrors(update.message);
    }
  };

  useEffect(() => {
    if (isExpiredToken()) {
      navigate("/");
    }
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-80 gap-5">
        <AccountButtonGroup />

        <Alert
          dismiss={Boolean(!errors.length)}
          rounded={true}
          withBorder={true}
          withBorderAccent={true}
          color="error"
        >
          <Alert.Container>
            <Alert.Icon>
              <XCircle size={24} color="#E92215" />
            </Alert.Icon>
            <Alert.Body>
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>
                <ul>
                  {errors?.map((error, key: number) => {
                    return <li key={key}>- {error}.</li>;
                  })}
                </ul>
              </Alert.Description>
            </Alert.Body>
          </Alert.Container>
        </Alert>

        <div>
          <Label htmlFor="#id-01" value="Full Name" />
          <TextInput
            id="#id-01"
            placeholder={userInfo?.name}
            color="gray"
            handleOnChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="#id-02" value="Email" />
          <TextInput
            id="#id-02"
            placeholder={userInfo?.email}
            color="gray"
            handleOnChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          onClick={changeUserInfo}
          className="w-full"
          size="md"
          type="primary"
          disabled={loading}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default Settings;
