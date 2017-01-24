import React from 'react';
import { connect } from 'react-redux';
import Pod from './Pod'

const mapStateToProps = (state) => {
  return {
    pods: state.pods
  }
};

export const PodList = ({ pods }) => (
  <div>
    {pods.map(pod =>
      <Pod
        key={pod.metadata.name}
        pod={pod}
      />
    )}
  </div>
);

export const PodListContainer = connect(
  mapStateToProps,
)(PodList);
