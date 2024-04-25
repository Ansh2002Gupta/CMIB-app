import React, {useState} from "react";
import { ScrollView } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./TrainingDetails.style";

import images from "../../../images";
import CustomModal from "../../../components/CustomModal";
import { MONTHS, YEARS } from "../../../constants/constants";
import CheckBox from "../../../components/CheckBox";
import ActionPairButton from "../../../components/ActionPairButton";
import { usePost } from "../../../hooks/useApiRequest";
import { formatDate } from "../../../utils/util";

const DeclarationForm = ({intl, onValidationChange = () => {}, onPressIconCross, setIsDeclarationCompleted}, ref) => {
  const [name, setName] = useState('');
  const [stdRegNo, setRegNo] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [articleshipDate, setArticleshipDate] = useState('');
  const [mcsDate, setMcsDate] = useState('');
  const [mcsCertificateNumber, setMcsCertificateNumber] = useState('');
  const [isConcent, setIsConcent] = useState(false);
  
  const {
    makeRequest,
    isLoading,
  } = usePost({
    url: 'member/nqca-placements/application/264/declaration-form',
  });

  const isSubmitButtonDisabled = name?.length > 0 && stdRegNo?.length > 0 && month?.length > 0 && year?.length > 0 && articleshipDate && mcsDate && isConcent &&  mcsCertificateNumber?.length > 0;

  const handleSubmit = () => {
    let payload = {
        name,
        "student_registration_no": mcsCertificateNumber,
        "final_exam_month": month,
        "final_exam_year": year,
        "articleship_completion_date": formatDate(articleshipDate, 'YYYY-MM-DD'),
        "mcs_completion_date": formatDate(mcsDate, "YYYY-MM-DD")
    }
    makeRequest({
        body: payload,
        onSuccessCallback: () => {
            setIsDeclarationCompleted(true);
        },
        onErrorCallback: (errrMessage) => {},
      });
  }

  return (
    <CustomModal isIconCross headerText={intl.formatMessage({ id: "label.declarationForm" })} onPressIconCross={onPressIconCross}>
        <ScrollView style={{height: 500}}>
        <CommonText>{intl.formatMessage({id: 'label.underTaking'})}</CommonText>
            <CustomTextInput
                customStyle={styles.textInputContainer(true)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.name" })}
                placeholder={'name'}
                isMandatory
                value={name}
                onChangeText={setName}
            />
            <CustomTextInput
                customStyle={styles.textInputContainer(true)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.stdRegNumber" })}
                placeholder={'Registration Number'}
                value={stdRegNo}
                isMandatory
                onChangeText={setRegNo}
            />
            <CustomTextInput
                customStyle={styles.textInputContainer(true)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.month" })}
                placeholder={'Month'}
                value={month}
                isMandatory
                isDropdown
                options={MONTHS}
                onChangeValue={setMonth}
            />
            <CustomTextInput
                customStyle={styles.textInputContainer(true)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.year" })}
                placeholder={'Registration Number'}
                value={year}
                isMandatory
                options={YEARS}
                isDropdown
                onChangeValue={setYear}
            />
            <CustomTextInput
                customStyle={styles.textInputContainer(true)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.articleshipCompleteDate" })}
                placeholder={'Select Date'}
                value={articleshipDate}
                isMandatory
                isCalendar
                onChangeValue={setArticleshipDate}
            />
            <CustomTextInput
                customStyle={styles.textInputContainer(true)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.mcsCompletionDate" })}
                placeholder={'Select Date'}
                value={mcsDate}
                isMandatory
                isCalendar
                onChangeValue={setMcsDate}
            />
            <CustomTextInput
                customStyle={styles.textInputContainer(true)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.mcsCertificateNo" })}
                placeholder={'Certificate Number'}
                isMandatory
                value={mcsCertificateNumber}
                onChangeText={setMcsCertificateNumber}
            />
            <CommonText>{intl.formatMessage({id: 'label.declarationDetails'})}</CommonText>
            <CheckBox
                title={intl.formatMessage({id: 'label.declarationConcent'})}
                isSelected={isConcent}
                handleCheckbox={(val) => {setIsConcent(prev => !prev)}}
                iconCheck={images.iconCheckbox}
                iconUnCheck={images.iconUnCheck}
                checkBoxTextStyle={styles.checkBoxTextStyle}
            />
            <ActionPairButton
                buttonOneText={intl.formatMessage({
                    id: "label.cancel"
                })}
                buttonTwoText={intl.formatMessage({ id: "label.submitDeclarationform" })}
                isDisabled={!isSubmitButtonDisabled || isLoading}
                isButtonTwoGreen
                onPressButtonOne={onPressIconCross}
                onPressButtonTwo={handleSubmit}
                />
       </ScrollView>
        
    </CustomModal>
  )
};

export default  React.forwardRef(DeclarationForm);