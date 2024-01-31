import React, { useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    getIncomers,
    getOutgoers,
    MiniMap,
    NodeToolbar,
    Panel,
    Position,
    Handle,
    getConnectedEdges,

  } from 'reactflow';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button } from '@material-ui/core';


import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './styles.css';


const initialNodes = [
    { id: '1', type: 'node-with-toolbar', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
    { id: '2', type: 'node-with-toolbar', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
];
  
const initialEdges = [];//[{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
    'node-with-toolbar': NodeWithToolbar,
};


function NodeWithToolbar({ id, data, isConnectable }) {

    const topid = "top" + id;
    const botid = "bot" + id;
    const leftid = "left" + id;
    const rightid = "right" + id;

    return (
      <>
        <NodeToolbar
          isVisible={data.forceToolbarVisible || undefined}
          position={data.toolbarPosition}
          align="end"
        >
            <div style={{display: 'flex', borderWidth: '10px', borderStyle: 'transparent', marginRight: -20 }}>
                <Button style={{minWidth: 10, marginRight: 5}}><EditFilled className="icon-button" style={{ fontSize: '20px' }}/></Button>
                <Button style={{minWidth: 10}} ><DeleteFilled className="icon-button" style={{ fontSize: '20px' }}/></Button>
            </div>

        </NodeToolbar>

        <Handle
          type="source"
          
          id={topid}
          position={Position.Top}
          //onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          id={botid}
          position={Position.Bottom}
          //onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        
        <div className="react-flow__node-default">{data?.label}</div>
      </>
    );
  }



const ProjectBoard = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges]);
    const onNodesDelete = useCallback(
        (deleted) => {
        setEdges(
            deleted.reduce((acc, node) => {
            const incomers = getIncomers(node, nodes, edges);
            const outgoers = getOutgoers(node, nodes, edges);
            const connectedEdges = getConnectedEdges([node], edges);

            const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

            const createdEdges = incomers.flatMap(({ id: source }) =>
                outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
            );

            return [...remainingEdges, ...createdEdges];
            }, edges)
        );
        },
        [nodes, edges]
    );

    const forceToolbarVisible = useCallback((enabled) =>
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, forceToolbarVisible: enabled },
      })),
    ),
  );


    return (
        <div className="providerflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper">
                <ReactFlow
                    connectionMode="loose"
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onNodesDelete={onNodesDelete}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    >
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    )
}

export default ProjectBoard