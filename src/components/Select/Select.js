/*
  React Imports
*/
import React from 'react';
/*
  Stylesheet Imports
*/
import s from './Select.css';


export default class Select extends React.PureComponent {
  state = {
    checkedArray: [],
    stateOfButton: false,
    value:null,
    stateOptions:[]
  };

  componentDidMount = () =>{
    const { options } = this.props;
    const stateOptions = [...options];
    this.setState({ stateOptions });
  }

  removeDuplicates = (array, item) => {
    let flag = false;
    array.filter((thing, index) => {
      if (thing['value'] === item.value) {
        flag = true;
      }
    });
    return flag;
  };

  removeElements = (array, item) => {
    let index_ = -1;
    array.filter((thing, index) => {
      if (thing['value'] === item.value) {
        index_ = index;
      }
    });
    return index_;
  };

  selectOption = (item, index) => {
    let _value = [];
    if (this.state.value) {
      _value = [...this.state.value];
    }
    let checkedArray_ = { ...this.state.checkedArray };
    if (!this.removeDuplicates(_value, item)) {
      _value.push({ label: item.label, value: item.value });
    } else {
      _value.splice(this.removeElements(_value, item), 1);
    }
    checkedArray_[index] = !checkedArray_[index];
    this.setState({ checkedArray: checkedArray_, value: _value }, ()=>{
      this.props.onChange(_value);
    });
  };

  singleSelection = item => {
    const singleValue = [{ label: item.label, value: item.value }];
    console.log(singleValue);
    this.setState({ checkedArray: singleValue }, () => {
      this.props.onChange(singleValue[0]);
    });
    
  }

  openSelectList = () => {
    this.setState({ stateOfButton: !this.state.stateOfButton });
  };

  onSearch = e => {
    const { stateOptions } = this.state;
    const { options, multiselect } = this.props;
    const { value } = e.target;
    let searchPattern = new RegExp(value, 'gi');
     let newStateOptions = [...options];
    if (value != '') {
      newStateOptions = stateOptions.filter(
        item => item.label && item.label.toLowerCase().match(searchPattern) !== null
      );
    }
    this.setState({ searchVal: value, stateOptions: newStateOptions });
  }

  render() {
    const { placeholder, multiselect } = this.props;
    const { value, stateOptions } = this.state;
    let buttonText;
    if (value === null || value.length === 0) {
      buttonText = placeholder;
    } else if (value.length === 1) {
      buttonText = value[0].label;
    } else if (value.length > 1) {
      buttonText = `${value.length} Selected`;
    }
    return (
      <div className={s.outer}>
        {this.state.stateOfButton && (
          <div className={s.overlay} onClick={() => this.openSelectList()} />
        )}
        <div className={'parent'}>
          <button
            type="button"
            className={'button'}
            onClick={() => this.openSelectList()}
          >
            <span>{buttonText}</span>
          </button>
          {this.state.stateOfButton && (
            <div className={'dropList'}>
              <div className={'searchHolder'}>
                <input placeholder={'Search'} onChange={this.onSearch} />
              </div>
              <div>
                {
                  stateOptions.length===0 && <div className={'searchNotFound'}> No Results Found</div>
                }
                {stateOptions.map((item, index) => {
                  return (
                    <div className={'dropListChild'} key={`${index}_parent`}
                    onClick={() =>
                          !multiselect && this.singleSelection(item, index)
                        }
                    >
                      <div
                        className={'checkBox'}
                        key={`${index}_checkbox`}
                        
                      >
                        {multiselect && (
                          <input
                            id={`checkbox_${index}`}
                            type="checkbox"
                            name={`option_${index}`}
                            defaultChecked={
                              this.state.checkedArray[index] &&
                              this.state.checkedArray[index]
                                ? true
                                : false
                            }
                            onChange={() =>
                              this.selectOption(item, index)
                            }
                          />
                        )}
                      </div>
                      <label
                        htmlFor={`checkbox_${index}`}
                        className={'option'}
                        key={`${index}_label`}
                        
                      >
                        {item.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Select.defaultProps = {
  multiselect: false,
  placeholder:'Select',
  onChange :()=>{}
};