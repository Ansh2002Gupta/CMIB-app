import React from 'react';
import {Text, View, TextInput} from '@unthinkable/react-core-components';
import styles from './CustomTextInput.style';

const CustomTextInput = ({title, isRequired, titleStyle}) => {
  return (
    // // <View style={styles.container}>
    //   // <View>
    //     <TextInput
    //       style={styles.input}
    //     />
    //   // </View>
    // // </View>
    <View style={styles.container}>
    <View>
      <Text style={styles.header}>
        {'label.welcome'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={'label.username'}
        // onChangeText={value => {
        //   setFormValues(v => {
        //     v.username = value;
        //     return {...v};
        //   });
        // }}
        // value={username}
      />
    </View>
  </View>
  );
};

export default CustomTextInput;
