/* dependencies
React
Material-ui - http://www.material-ui.com
*/


import React, { Component } from 'react'

import Checkbox from 'material-ui/Checkbox'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import {
  amber500,deepOrange700,
} from 'material-ui/styles/colors';

import IconButton from 'material-ui/IconButton';
const styles = {
  checkbox: {
    marginTop: 10,
    marginRight: -10,
    float:'left',
    width:''
  },
  icon: {
    fill: amber500
  }
}

let s1, s2, s3, s4, s5
let checks = [true,false,false,false,false]
export default class Rating extends Component {
  starChecked(star,d,r){
    //console.log(star.target.value)
  }
  render(){

    return (
      <div>
        <Checkbox value="s1" iconStyle={styles.icon} style={styles.checkbox} checkedIcon={<Star />} uncheckedIcon={<StarBorder />} onCheck={this.starChecked} />
        <Checkbox iconStyle={styles.icon} style={styles.checkbox} checkedIcon={<Star />} uncheckedIcon={<StarBorder />} />
        <Checkbox iconStyle={styles.icon} style={styles.checkbox} checkedIcon={<Star />} uncheckedIcon={<StarBorder />} />
        <Checkbox iconStyle={styles.icon} style={styles.checkbox} checkedIcon={<Star />} uncheckedIcon={<StarBorder />} />
        <Checkbox iconStyle={styles.icon} style={styles.checkbox} checkedIcon={<Star />} uncheckedIcon={<StarBorder />} />
      </div>
    )
  }
}
