import React, { Component, Fragment } from 'react';
import { Slider } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { isNil } from 'ramda';
import { ColorWheel } from 'react-native-color-wheel';

import { withContainer, BulbItem } from '../../components';
import { resetSelectedBulbAction } from '../../actions/yeelight';
import { setBri, get } from '../../services/yeelight';

const lightJSON = require('../../assets/lottie/light_bulb.json');

class BulbDetailsComponent extends Component {
  bulb;

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.bulb = navigation.getParam('bulb');
    get(this.bulb._id);
  }

  componentWillUnmount() {
    const { resetSelectedBulbAction } = this.props;
    resetSelectedBulbAction();
  }

  onChange = () => {
    // Here change color
  };

  render() {
    const { selectedBulb } = this.props;
    return (
      <Fragment>
        <AnimationContainer>
          <LottieView source={lightJSON} autoPlay loop={false} />
        </AnimationContainer>
        <Transition shared={this.bulb._id}>
          <BulbItem bulb={isNil(selectedBulb) ? this.bulb : selectedBulb} isDetail />
        </Transition>
        {!isNil(selectedBulb) && (
          <DetailsContainer>
            <Section>
              <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
                onSlidingComplete={(value) => {
                  setBri(selectedBulb._id, value);
                }}
                value={selectedBulb.bri}
                style={{ flex: 1 }}
              />
            </Section>
            <Section>
              <ColorWheel
                initialColor="#ee0000"
                onColorChangeComplete={color => this.onChange(color)}
                style={{ width: 100, height: 200 }}
              />
            </Section>
          </DetailsContainer>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ yeelightReducer: { selectedBulb } }) => ({
  selectedBulb,
});

const mapDispatchToProps = dispatch => ({
  resetSelectedBulbAction: () => dispatch(resetSelectedBulbAction()),
});

export const BulbDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContainer(BulbDetailsComponent));

const AnimationContainer = styled.View`
  height: 280;
`;

const Section = styled.View`
  margin-top: ${({ theme }) => theme.padding.m};
  padding: ${({ theme }) => theme.padding.m};
  flex-direction: row;
`;

const DetailsContainer = styled.View`
  flex: 1;
`;
