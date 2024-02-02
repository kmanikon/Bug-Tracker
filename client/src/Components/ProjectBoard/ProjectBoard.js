import React, { useCallback, mem, useState } from 'react';
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
    Controls,
    getConnectedEdges,
    useReactFlow,
    ControlButton

  } from 'reactflow';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button, TextField, Paper } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import TicketNode from './TicketNode';

import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './styles.css';


const initialNodes = [
    { id: '1', type: 'node-with-toolbar', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
    { id: '2', type: 'node-with-toolbar', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
    { id: '3', type: 'node-with-toolbar', data: { label: 'Node 3' }, position: { x: 100, y: 300 } },
];
  
const initialEdges = [];//[{ id: 'e1-2', source: '1', target: '2' }];


const nodeTypes = {
    //'node-with-toolbar': NodeWithToolbar,
    'node-with-toolbar': TicketNode
};


/*
const memo(({ id, data, isConnectable }) => {
//function NodeWithToolbar({ id, data, isConnectable }) {

    const topid = "top" + id;
    const botid = "bot" + id;
    const leftid = "left" + id;
    const rightid = "right" + id;


    const removeNode = () => {
      const {
        getNode,
        getNodes,
        getEdges,
        setEdges,
        deleteElements
      } = useReactFlow();

      const node = getNode(id);
  
      if (!node) {
        return;
      }
  
      const nodes = getNodes();
      const edges = getEdges();
      const [prevNode] = getIncomers(node, nodes, edges);
      const [nextNode] = getOutgoers(node, nodes, edges);
  
      const connectedEdges = getConnectedEdges([node], edges);
  
      const insertEdge = {
        id: `${prevNode.id}=>${nextNode.id}`,
        target: nextNode.id,
        source: prevNode.id
      };
  
      deleteElements({ nodes: [node], edges: connectedEdges });
      setEdges((prev) => prev.concat(insertEdge));
    };

    return (
      <>
        <NodeToolbar
          isVisible={data.forceToolbarVisible || undefined}
          position={data.toolbarPosition}
          align="end"
        >
            <div style={{display: 'flex', borderWidth: '10px', borderStyle: 'transparent', marginRight: -20 }}>
                <Button style={{minWidth: 10, marginRight: 5}}><EditFilled className="icon-button" style={{ fontSize: '20px' }}/></Button>
                <Button style={{minWidth: 10}} onClick={() => console.log()}><DeleteFilled className="icon-button" style={{ fontSize: '20px' }}/></Button>
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

  */



const ProjectBoard = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges]);
    const [mode, setMode] = useState('add');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const underLineStyles = {
      textDecoration: 'underline', textUnderlineOffset: '14px', textDecorationThickness: 3, textDecorationColor: '#7CB9E8', backgroundColor: 'transparent', textTransform: 'none', fontSize: 16
    }

    const normalStyles = {
      textTransform: 'none', fontSize: 16
    }


    return (
      <>
        <div className="providerflow">
          <ReactFlowProvider>
            <div className="reactflow-wrapper">
              <ReactFlow
                connectionMode="loose"
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="top-left"
              >
                <Background variant="dots" gap={12} size={1} />
                <Controls>
                </Controls>
              </ReactFlow>
              

            </div>
          </ReactFlowProvider>

          <Divider orientation="vertical" flexItem />
          <div className="boardWindow">
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '20px'}}>
              <Button 
                color="black" 
                size="medium" 
                disableRipple
                //style={underLineStyles}   
                style={mode === 'add' ? underLineStyles: normalStyles} 
                onClick={() => setMode('add')}
              >
                Add Ticket
              </Button>

              <Divider orientation="vertical" flexItem />


              <Button

                color="black" 
                size="medium" 
                disableRipple
                //className="underLinedButton"
                style={mode === 'note' ? underLineStyles: normalStyles} 
                onClick={() => setMode('note')}
              >
              Create Note
              </Button>

            </div>
            
            <div style={{marginTop: '30px'}}></div>

            {mode === 'note' && 
            <>
              <TextField
                className="text"
                onChange={(e) => setTitle(e.target.value)}  
                value={title} 
                label="Title"
                variant="outlined"
                //placeholder="Title"
                size="small"
                style={{
                    marginLeft: '10%',
                    marginBottom: '20px',
                    marginTop: '0px',
                    width: '80%'

                }}
              />



              <TextField
                className="text"
                onChange={(e) => setDescription(e.target.value)}  
                value={description} 
                label="Description"
                variant="outlined"
                multiline
                minRows={14}
                maxRows={14}
                //placeholder="Title"
                size="medium"
                style={{
                    marginLeft: '10%',
                    marginBottom: '20px',
                    marginTop: '0px',
                    width: '80%'

                }}
              />

              <Button 
                //variant="outlined"
                color="primary"
                variant="contained"
                style={{textAlign: 'center', width: '80%', marginLeft: '10%', height: 50, textTransform: 'none', fontSize: 16}}>
                Create Note
              </Button>
              </>
            }
          </div>
        </div>


      </>
    );
}

export default ProjectBoard