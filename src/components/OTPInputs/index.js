import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native';
// import _ from 'lodash';
import styles from './styles';

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
// const viewPropTypes = ViewPropTypes || View.propTypes;

export default class OTPInputs extends Component {
  /*---------------------------------------------------------------*
   *                  Validation Property Types                    *
   *---------------------------------------------------------------*/

  static propTypes = {
    codeLength: PropTypes.number,
    compareWithCode: PropTypes.string,
    // inputPosition: PropTypes.string,
    // space: PropTypes.number,
    // className: PropTypes.string,
    // cellBorderWidth: PropTypes.number,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    ignoreCase: PropTypes.bool,
    autoFocus: PropTypes.bool,
    // codeInputStyle: TextInput.propTypes.style,
    // containerStyle: viewPropTypes.style,
    onFulfill: PropTypes.func,
  };

  /*---------------------------------------------------------------*
   *    Render  Default  Input fields with properties              *
   *---------------------------------------------------------------*/

  static defaultProps = {
    codeLength: 4,
    // inputPosition: 'center',
    autoFocus: true,
    // className: 'border-b',
    // cellBorderWidth: 1,
    activeColor: '#000',
    inactiveColor: '#ccc',
    compareWithCode: '',
    ignoreCase: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0,
    };

    this.codeInputRefs = [];
  }

  componentDidMount() {
    const {compareWithCode, codeLength} = this.props;
    if (compareWithCode && compareWithCode.length !== codeLength) {
      console.log(
        'Invalid props: compareWith length is not equal to codeLength',
      );
    }
  }

  /*------------------------
    * Find index from array  *
    -------------------------*/

  _baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /*------------------------------------------
   * Clear inputs when code when event fires *
  -------------------------------------------*/

  _clear() {
    this.setState({
      codeArr: new Array(this.props.codeLength).fill(null),
      currentIndex: 0,
    });
    this._setFocus(0);
  }

  /*--------------------------------------
      Set input focus on current key
  ----------------------------------------*/

  _setFocus(index) {
    this.codeInputRefs[index].focus();
  }

  /*--------------------------------------
      blur input focus on current key
  ----------------------------------------*/

  _blur(index) {
    this.codeInputRefs[index].blur();
  }

  /*-------------------------------------------
    on key Change set focus and values in array
  ---------------------------------------------*/

  _onBlur(index) {
    this.codeInputRefs[index].setNativeProps({
    style:{borderBottomColor: '#ccc'}
    });
  }

  _onFocus(index) {
    this.codeInputRefs[index].setNativeProps({
    style:{borderBottomColor: '#007bff'}
    });
    let newCodeArr = [...this.state.codeArr];
    const currentEmptyIndex = this._baseFindIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this._setFocus(currentEmptyIndex);
    }
    for (const i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    }

    this.setState({
      codeArr: newCodeArr,
      currentIndex: index,
    });
  }

  /*----------------------------------------------
    compare code returns true or false
  ---------------------------------------------*/
  _isMatchingCode(code, compareWithCode, ignoreCase = false) {
    if (ignoreCase) {
      return code.toLowerCase() == compareWithCode.toLowerCase();
    }
    return code == compareWithCode;
  }

  /*----------------------------------------------
    Backspace press set focus and current index
  ---------------------------------------------*/

  _onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      const {currentIndex} = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      this._setFocus(nextIndex);
    }
  }

  /*-----------------------------------------------------
    Handle set values in array, compare code and set focus
    -------------------------------------------------------*/

  _onInputCode(character, index) {
    const {codeLength, onFulfill, compareWithCode, ignoreCase} = this.props;
    let newCodeArr = [...this.state.codeArr];
    newCodeArr[index] = character;

    if (index == codeLength - 1) {
      const code = newCodeArr.join('');

      if (compareWithCode) {
        const isMatching = this._isMatchingCode(
          code,
          compareWithCode,
          ignoreCase,
        );
        onFulfill(isMatching, code);
        !isMatching && this._clear();
      } else {
        onFulfill(code);
      }
      this._blur(this.state.currentIndex);
    } else {
      this._setFocus(this.state.currentIndex + 1);
    }

    this.setState(prevState => {
      return {
        codeArr: newCodeArr,
        currentIndex: prevState.currentIndex + 1,
      };
    });
  }

  /*------------------------------------------
    Render inputs and its properties defined
   -------------------------------------------*/

  render() {
    const {codeLength, autoFocus} = this.props;

    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      console.log(this.state.currentIndex)
      const id = i;
      console.log(id)
      codeInputs.push(
        <TextInput
          key={id}
          ref={ref => (this.codeInputRefs[id] = ref)}
          style={styles.codeInput}
          keyboardType={'phone-pad'}
          returnKeyType={'done'}
          {...this.props}
          autoFocus={autoFocus && id == 0}
          onFocus={() => this._onFocus(id)}
          onBlur={() => this._onBlur(id)}
          value={
            this.state.codeArr[id] ? this.state.codeArr[id].toString() : ''
          }
          onChangeText={text => this._onInputCode(text, id)}
          onKeyPress={e => this._onKeyPress(e)}
          maxLength={1}
        />,
      );
    }

    return <View style={styles.innerContainer}>{codeInputs}</View>;
  }
}
