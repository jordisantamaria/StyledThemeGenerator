import * as React from 'react';
import {Flex, Heading, Panel} from '../../../components/UI/basic';
import SectionContainer from './SectionContainer';
import {InputControlled} from '../../../components/UI/Forms/InputStyled';
import {INumberArrayValue, setThemeFontSize} from '../../../lib/redux/ThemeActions';
import {connect} from 'react-redux';

interface IProps {
  fontSizes: number[];
  setFontSize: (fontSize: INumberArrayValue) => void;
}

const FontSizesSection = (props: IProps) => {

  const onChangeInput = (index, value) => {
    if(parseInt(value) >= 0 ) {
      const fontSizeTheme: INumberArrayValue = {
        index: index,
        value: parseInt(value),
      }
      console.log('spaceTheme = ', fontSizeTheme);
      props.setFontSize(fontSizeTheme);
    }
  }

  return (
    <SectionContainer>
      <Heading fontSize={18} p={2}>
        Font sizes
      </Heading>
      <Flex flexWrap={"wrap"}>
        {props.fontSizes.map((value, index) => {
          return (
            <Panel width={180}>
              <InputControlled name={`fontsize${index}`} value={`${value}`} onChange={onChangeInput.bind(this, index)}/>
            </Panel>
          );
        })}
      </Flex>
    </SectionContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setFontSize: fontSize => dispatch(setThemeFontSize(fontSize))
  };
};

export default connect(
null,
mapDispatchToProps
)(FontSizesSection);
