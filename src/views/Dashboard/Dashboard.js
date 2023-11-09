import React from 'react';
import {useIntl} from 'react-intl';
import {View, Text} from '@unthinkable/react-core-components';
import HeaderText from '../../components/HeaderText/HeaderText';

import styles from './dashboard.style';
import {TextInput} from '@unthinkable/react-core-components';
import SubHeadingText from '../../components/SubHeadingText';
import CustomTextInput from '../../components/CustomTextInput';

function DashboardView(props) {
  return (
    // <View style={styles.container}>
    //   <HeaderText text={'Welcome to CMI&B Company Sign-up'} />
    //   <SubHeadingText text={'Choose your interest(s)'} />
    // </View>
  //   <View style={styles.container}>
  //   <View>
  //     <Text style={styles.header}>
  //       {'label.welcome'}
  //     </Text>
  //     <TextInput
  //       style={styles.input}
  //       placeholder={'label.username'}
  //       // onChangeText={value => {
  //       //   setFormValues(v => {
  //       //     v.username = value;
  //       //     return {...v};
  //       //   });
  //       // }}
  //       // value={username}
  //     />
  //   </View>
  // </View>
  <CustomTextInput/>
  );
}

export default DashboardView;
