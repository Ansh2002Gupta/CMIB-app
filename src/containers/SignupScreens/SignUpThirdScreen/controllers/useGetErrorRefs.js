import { useRef } from "react";
import {
  CAREER_ASCENTS,
  CA_JOBS,
  NEWLY_QUALIFIED,
  OVERSEAS_PLACEMENTS,
  WOMENT_PLACEMENT,
} from "../../../../constants/constants";

const useGetErrorRefs = () => {
  const caJobsNameRef = useRef(null);
  const caJobsDesignationRef = useRef(null);
  const caJobsEmailRef = useRef(null);
  const caJobsMobileRef = useRef(null);

  const nqcaNameRef = useRef(null);
  const nqcaDesignationRef = useRef(null);
  const nqcaEmailRef = useRef(null);
  const nqcaMobileRef = useRef(null);

  const overseasNameRef = useRef(null);
  const overseasDesignationRef = useRef(null);
  const overseasEmailRef = useRef(null);
  const overseasMobileRef = useRef(null);

  const careerAscentNameRef = useRef(null);
  const careerAscentDesignationRef = useRef(null);
  const careerAscentEmailRef = useRef(null);
  const careerAscentMobileRef = useRef(null);

  const womenPlacementNameRef = useRef(null);
  const womenPlacementDesignationRef = useRef(null);
  const womenPlacementEmailRef = useRef(null);
  const womenPlacementMobileRef = useRef(null);

  const getAppropriateRef = (module, name) => {
    if (module === CA_JOBS) {
      if (name === "name") {
        return caJobsNameRef;
      }
      if (name === "designation") {
        return caJobsDesignationRef;
      }
      if (name === "mobileNo") {
        return caJobsMobileRef;
      }
      if (name === "emailId") {
        return caJobsEmailRef;
      }
    }
    if (module === NEWLY_QUALIFIED) {
      if (name === "name") {
        return nqcaNameRef;
      }
      if (name === "designation") {
        return nqcaDesignationRef;
      }
      if (name === "mobileNo") {
        return nqcaEmailRef;
      }
      if (name === "emailId") {
        return nqcaMobileRef;
      }
    }
    if (module === OVERSEAS_PLACEMENTS) {
      if (name === "name") {
        return overseasNameRef;
      }
      if (name === "designation") {
        return overseasDesignationRef;
      }
      if (name === "mobileNo") {
        return overseasMobileRef;
      }
      if (name === "emailId") {
        return overseasEmailRef;
      }
    }
    if (module === CAREER_ASCENTS) {
      if (name === "name") {
        return careerAscentNameRef;
      }
      if (name === "designation") {
        return careerAscentDesignationRef;
      }
      if (name === "mobileNo") {
        return careerAscentMobileRef;
      }
      if (name === "emailId") {
        return careerAscentEmailRef;
      }
    }
    if (module === WOMENT_PLACEMENT) {
      if (name === "name") {
        return womenPlacementNameRef;
      }
      if (name === "designation") {
        return womenPlacementDesignationRef;
      }
      if (name === "mobileNo") {
        return womenPlacementMobileRef;
      }
      if (name === "emailId") {
        return womenPlacementEmailRef;
      }
    }
  };

  return {
    getAppropriateRef,
  };
};

export default useGetErrorRefs;
