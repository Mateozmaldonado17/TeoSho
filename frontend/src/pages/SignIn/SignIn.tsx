import { Button, TextInput, Typography, Notification } from "keep-react";
import { Envelope, EyeSlash, Lock } from "phosphor-react";
import { useEffect, useState } from "react";
import { useBaseFetch } from "../../services";
import { useNavigate } from "react-router-dom";
import { isExpiredToken } from "../../utils";
import { useShoppingContext } from "../../context/shopping";

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const { setIsAuth } = useShoppingContext();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const { post, data, error, loading } = useBaseFetch();

  const handleSubmit = async () => {
    const request = await post("/user/sign-in", {
      email,
      password,
    });
    if (!request.error) {
      localStorage.setItem("token", request);
      setIsAuth(true);
      navigate("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isExpiredToken() && token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error?.name === "401") {
      return setShowNotification(false);
    }
    setShowNotification(true);
  }, [error]);

  return (
    <div className="flex justify-center">
      <Notification dismiss={showNotification} position="top-left">
        <Notification.Body>
          <Notification.Description>{data?.error}</Notification.Description>
          <Notification.Container className="!mt-6 flex gap-3">
            <Button
              type="primary"
              size="sm"
              onClick={() => setShowNotification(true)}
            >
              Close
            </Button>
          </Notification.Container>
        </Notification.Body>
      </Notification>
      <div className="flex flex-col w-full max-w-60 gap-5">
        <Typography variant="heading-5">Welcome</Typography>
        <TextInput
          id="#id-9"
          placeholder="example@gmail.com"
          color="gray"
          sizing="md"
          addon={<Envelope size={20} color="#5E718D" />}
          addonPosition="left"
          handleOnChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <TextInput
          id="#id-10"
          placeholder="Password Here"
          color="gray"
          sizing="md"
          type="password"
          addon={<Lock size={20} color="#5E718D" />}
          addonPosition="left"
          icon={<EyeSlash size={20} color="#5E718D" />}
          iconPosition="right"
          handleOnChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <Button
          onClick={handleSubmit}
          className="w-full"
          size="md"
          type="default"
          disabled={loading}
        >
          Access
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
