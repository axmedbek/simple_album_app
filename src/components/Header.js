import React from 'react';
import PropTypes from 'prop-types';
import { View , Text } from 'react-native';

export default Header = ( { headerText } ) => {
  return (
    <View style={styles.headerView}>
        <Text style={styles.headerText}>{headerText}</Text>
    </View>
  )
}

Header.propTypes = {

}

const styles = {
    headerView : {
        height:100,
        backgroundColor : 'gray',
        shadowOpacity: 0.2,
    },
    headerText : {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign : 'center',
        marginTop : 25,
        color : 'white'
    }
}
