/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable react/sort-prop-types */
import 'echarts-gl';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
const defaultProps = {};

class SupersetEcharts extends React.PureComponent {
  render() {
    const {
      data,
      width,
      height
    } = this.props;

    return (
      <ReactEcharts style={{ height: height, width: width }} option={data} />
    );
  }
}

SupersetEcharts.propTypes = propTypes;
SupersetEcharts.defaultProps = defaultProps;

export default SupersetEcharts;
