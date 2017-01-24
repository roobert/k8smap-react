import React from 'react';
import { connect } from 'react-redux';
import Node from './Node'

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes
  }
};

export const NodeList = ({ nodes }) => (
  <div>
    {nodes.map(node =>
      <Node
        key={node.metadata.name}
        node={node}
      />
    )}
  </div>
)

export const NodeListContainer = connect(
  mapStateToProps,
)(NodeList);
