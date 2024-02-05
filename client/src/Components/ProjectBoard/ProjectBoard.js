import React, { useCallback, mem, useState, useEffect } from 'react';
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
    ControlButton,
    MarkerType,
    useViewport

  } from 'reactflow';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button, TextField, Paper } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import TicketNode from './TicketNode';
import Note from './Note';

import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './styles.css';


const defaultEdgeOptions = {
  animated: false,
  type: 'step',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#cdcdcd',
  },
};

const nodeTypes = {
    'node-with-toolbar': TicketNode,
    'note': Note
};

let selectedNode = 0;



/*
  ticket: ticket, 
  ticketNum: ticketNum, 
  project: project, 
  devList: devList, 
  changeCount: changeCount, 
  myTickets: myTickets

  ticket list
  index -> tikcet num
  project
  devlist
  changeCount
  myTickets = false
*/

let linkTickets = [];
let linkProject = null;
let linkDevlist = [];
let linkChangeCount = 0;

let id = 0;

const ProjectBoard = ({tickets, project, devlist, changeCount}) => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges]);
    const [mode, setMode] = useState('add');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //let [id, setId] = useState(0);



    useEffect(() => {
      linkTickets = tickets;
      linkProject = project;
      linkDevlist = devlist;
      linkChangeCount = changeCount;
    }, [tickets, project, devlist, changeCount]);
    

    const formatTickets = (userTickets) => {
      const newList = userTickets.map(ticket => {
        return {
          id: String(ticket.postId),
          type: 'node-with-toolbar',
          data: { label: ticket.title, description: ticket.description, ticketNum: ticket.postId, index: ticket.index }
        };
      });

      return newList;
    };

    let [formattedTickets, setFormattedTickets] = useState([]);//formatTickets(tickets));

    useEffect(() => {
      const updatedTickets = formatTickets(tickets);
      setFormattedTickets(updatedTickets);
    }, [tickets]);

    

    const getId = () => {
      return `${id++}`;
    }


    const underLineStyles = {
      textDecoration: 'underline', textUnderlineOffset: '14px', textDecorationThickness: 3, textDecorationColor: '#7CB9E8', backgroundColor: 'transparent', textTransform: 'none', fontSize: 16
    }

    const normalStyles = {
      textTransform: 'none', fontSize: 16
    }

    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    

    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
      (event) => {
        event.preventDefault();
      
        if (selectedNode != null && formattedTickets && formattedTickets.length > 0) {
        
            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });

            let selectedTicket = formattedTickets[selectedNode];

            const newNode = {
              id: getId(), 
              type: 'node-with-toolbar',
              data: selectedTicket.data,
              position
            };
            
            setNodes((nds) => nds.concat(newNode));
        }
        
      },
      [reactFlowInstance],
      
    );



    const onDragStart = (event, nodeType, index) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
  
      //setSelectedNode(index);    
      selectedNode = index;
    };

    
    const TicketDrag = ({index}) => {
      return (
        <div 
            style={{
                width: '100%'
            }}
        >
          <div
            className="drag_btns" 
            onDragStart={(event) => onDragStart(event, 'input', index)} draggable
          >
            <div className="drag_txt">
              {formattedTickets && formattedTickets.length > 0 &&
                <>
                  {formattedTickets[index].data.label}
                </>
              }
            </div>
          </div>
        </div>
      );
    };



    const editNote = (id, newDescription) => {
      console.log('hi')
      setNodes((nds) => nds.map((node) => {
        if (node.id === id) {
          // If the node has the matching id, update its data
          return {
            ...node,
            data: {
              title: node.data.title,
              description: newDescription,
              editNote: node.data.editNote
            },
          };
        }
        return node;
      }));
    };
    
    const createNote = () => {

      const { innerWidth: width, innerHeight: height } = window;
      
      const position = reactFlowInstance.screenToFlowPosition({
        x: width / 2,
        y: height / 2,
      });

      const data = {title: title, description: description, editNote: editNote}

      const newNode = {
        id: getId(),
        type: 'note',
        data: data,
        position
      };
      
      setNodes((nds) => nds.concat(newNode));
    }
    
    



    return (
      <>
        
        <div className="providerflow">
        {formattedTickets && tickets && formattedTickets.length === tickets.length &&
          <ReactFlowProvider>
            <div className="reactflow-wrapper">
              <ReactFlow
                connectionMode="loose"
                nodes={nodes}
                edges={edges}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="top-left"
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                connectionLineType="SmoothStep"
              >
                <Background variant="dots" gap={12} size={1} />
                <Controls>
                </Controls>
              </ReactFlow>
              

            </div>
          </ReactFlowProvider>
        }

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
            
           

            {mode === 'add' && 
              <>
              <div style={{marginTop: '20px'}}></div>

                <div className="scroll">
                  {formattedTickets && formattedTickets.length > 0 && 
                    <>
                      {formattedTickets.map((post, index) =>
                        <div key={index}>
                          <TicketDrag index={index}/>
                        </div>
                      )}
                    </>
                  }
                  
                </div>

              </>
            }

            {mode === 'note' && 
            <>
              <div style={{marginTop: '30px'}}></div>

              {/*
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
              */}
              



              <TextField
                className="text"
                onChange={(e) => setDescription(e.target.value)}  
                value={description} 
                label="Comment"
                variant="outlined"
                multiline
                minRows={16}
                maxRows={16}
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
                style={{textAlign: 'center', width: '80%', marginLeft: '10%', height: 50, textTransform: 'none', fontSize: 16}}
                onClick={createNote}
              >
                Create Note
              </Button>
              </>
            }
          </div>
        </div>


      </>
    );
}

export default ProjectBoard;
export { linkTickets, linkProject, linkDevlist, linkChangeCount };