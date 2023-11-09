import { useEffect } from "react";
import {useNavigate} from '../routes';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/home`);
  }, [navigate]);

  return null;
};

export default Index;
