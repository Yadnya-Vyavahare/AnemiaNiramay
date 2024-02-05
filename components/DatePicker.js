// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Icon from 'react-native-vector-icons/FontAwesome';

// const DatePicker = ({ onSelect, onAgeEntered }) => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     //  console.warn("A date has been picked: ", date);
//     const dt = new Date(date);
//     const x = dt.toISOString().split('T');
//     const x1 = x[0].split('-');
//     //console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
//     //setSelectedDate(x1[0] + '/' + x1[1] + '/' + x1[2]);
//     const formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];
//     setSelectedDate(formattedDate);
//     onSelect(formattedDate); // Pass the selected date to the parent component
//     onAgeEntered(false);
//     hideDatePicker();
//   };

//   const toggleDatePicker = () => {
//     // Toggle the visibility of the date picker
//     setDatePickerVisibility(!isDatePickerVisible);
//   };

//   return (
//     <View>
//         <View style={styles.datePickerContainer}>
//             <TouchableOpacity onPress={toggleDatePicker}>
//                 <Icon name="calendar" size={25} color="#E38B29" />
//             </TouchableOpacity>
//             <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode="date"
//                 onConfirm={handleConfirm}
//                 onCancel={hideDatePicker}
//             />
//             <View style={styles.showDate}>
//                 <Text style={{fontSize: 15, marginTop: 3, color: 'black'}}>{selectedDate}</Text>
//             </View>
//         </View>
        
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     calendarIcon: {
//         marginRight: 10,
//         fontSize: 30,
//         marginBottom: 5,
//       },
//     datePickerContainer: {
//         marginLeft: 50,
//         flexDirection: 'row',
//         marginTop: 15,
//     },
//     showDate: {
//         marginLeft: 20,
//     }
// });

// export default DatePicker; 



import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';


const DatePicker = ({ onSelect, onAgeEntered }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const currentDate = new Date(); // Get the current date


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };


  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    //console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    const formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];
    setSelectedDate(formattedDate);
    onSelect(formattedDate);
    onAgeEntered(false);
    hideDatePicker();
  };


  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };


  return (
    <View>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={toggleDatePicker}>
          <Icon name="calendar" size={25} color="#E38B29" />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={currentDate} // Set maximumDate to the current date
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.showDate}>
          <Text style={{ fontSize: 15, marginTop: 3, color: 'black' }}>
            {selectedDate}
          </Text>
        </View>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
    calendarIcon: {
        marginRight: 10,
        fontSize: 30,
        marginBottom: 5,
      },
    datePickerContainer: {
        marginLeft: 50,
        flexDirection: 'row',
        marginTop: 15,
    },
    showDate: {
        marginLeft: 20,
    }
});


export default DatePicker;