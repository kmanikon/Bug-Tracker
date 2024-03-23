import React, { useCallback, mem, useState, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    MarkerType,
  } from 'reactflow';
import { Button, TextField, useMediaQuery } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import TicketNode from './TicketNode';
import Note from './Note';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import 'reactflow/dist/style.css';


import './styles.css';

import url from '../../defs';


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

const ProjectBoard = ({tickets, project, devlist, changeCount, open, handleClose, openClear, handleCloseClear, isSmallScreen}) => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges]);
    const [mode, setMode] = useState('add');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [workflowId, setWorkflowId] = useState(null);

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

    const setInitialId = () => {
      const maxId = nodes.reduce((max, obj) => obj.id > max ? obj.id : max, 0);
      console.log(maxId);
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

    
    const createNote = () => {

      const { innerWidth: width, innerHeight: height } = window;
      
      const position = reactFlowInstance.screenToFlowPosition({
        x: width / 2,
        y: height / 2,
      });

      const data = {title: title, description: description}

      const newNode = {
        id: getId(),
        type: 'note',
        data: data,
        position
      };
      
      setNodes((nds) => nds.concat(newNode));
    }

    const destringNodes = (JSONString) => {
      const parsedNodes = JSON.parse(JSONString);
      let newNodes = [];
      parsedNodes.forEach((node) => {
        newNodes.push(node);
      });

      const maxId = newNodes.reduce((max, obj) => obj.id > max ? obj.id : max, 0);
      id = (maxId + 1);

      setNodes(newNodes);
    }

    const destringEdges = (JSONString) => {
      const parsedEdges = JSON.parse(JSONString);
      let newEdges = [];
      parsedEdges.forEach((edge) => {
        newEdges.push(edge);
      });

      setEdges(newEdges);
    }

    const makeAPICallCreateWorkflow = async (route) => {
      const newWorkflow = {
        workflowId: 0,
        projectId: project.projectId,
        nodesJSON: "",
        edgesJSON: ""
      }

      fetch(url + route, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newWorkflow)
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          setWorkflowId(response?.workflowId);
        }
      });
    };

    const makeAPICallGetWorkflow = async (route) => {
      fetch(url + route, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
          if (response == "No Workflow."){
            makeAPICallCreateWorkflow('create-workflow');
          }else {
              console.log(response);

              if (response){
                if (response.nodesJSON){
                  destringNodes(response.nodesJSON);
                }
                if (response.edgesJSON){
                  destringEdges(response.edgesJSON);
                }
                setWorkflowId(response?.workflowId);
              }
          }
      });
    };







    const makeAPICallCreateWorkflowSave = async (route) => {
      const newWorkflow = {
        workflowId: 0,
        projectId: project.projectId,
        nodesJSON: "",
        edgesJSON: ""
      }

      fetch(url + route, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newWorkflow)
      })
      .then(response => response.json())
      .then(response => {
        if (response && response?.workflowId){
          setWorkflowId(response?.workflowId);
          makeAPICallUpdateWorkflow('update-workflow/', response.workflowId);
        }
      });
    };

    const makeAPICallGetWorkflowSave = async (route) => {
      fetch(url + route, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
          if (response == "No Workflow."){
            makeAPICallCreateWorkflowSave('create-workflow');
          }else {
              if (response && response?.workflowId){
                setWorkflowId(response?.workflowId);
                makeAPICallUpdateWorkflow('update-workflow/', response.workflowId);
              }
          }
      });
    };

    


    const setupWorkflow = () => {
      if (project){
        makeAPICallGetWorkflow('get-workflow-by-project-id/' + project.projectId);
      }
    };


    useEffect(() => {
      setupWorkflow();
    }, [])


    const makeAPICallUpdateWorkflow = async (route, wid) => {

      const nodeStr = JSON.stringify(nodes);
      const edgesStr = JSON.stringify(edges);

      const body = {
        workflowId: wid,
        projectId: project.projectId,
        nodesJSON: nodeStr,
        edgesJSON: edgesStr
      }

      fetch(url + route, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
         console.log('Updated Successfully.')
      });
    }; 


    const saveWorkFlow = async () => {
      if (project && workflowId != null) {
        makeAPICallUpdateWorkflow('update-workflow/', workflowId);
      }
      else if (project) {
        makeAPICallGetWorkflowSave('get-workflow-by-project-id/' + project.projectId);
      }
    }

    const handleSave = async () => {
        saveWorkFlow();
        handleClose();
    }

    const clearBoard = () => {
      setNodes([]);
      setEdges([]);
      handleCloseClear();
    }

    const SaveDialog = ({open, handleClose}) => {
      return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" variant="h5" 
                style={{
                    fontWeight: 'bold',
                    fontSize: 'large',
                    minWidth: isSmallScreen ? 240 : 300,
                    //minHeight: 300
                }}
            >
            {"Save Workflow"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" >
                Save workflow configuration?
            </DialogContentText>
            </DialogContent>
            <DialogActions>

              <div style={{marginBottom: 5}}>
                <Button onClick={handleSave}><CheckOutlinedIcon/></Button>
                <Button onClick={handleClose}><ClearOutlinedIcon/></Button>
              </div>
            </DialogActions>
        </Dialog>
      );
    }

    const ClearDialog = ({open, handleClose}) => {
      return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" variant="h5" 
                style={{
                    fontWeight: 'bold',
                    fontSize: 'large',
                    minWidth: isSmallScreen ? 240 : 300,
                    //minHeight: 300
                }}
            >
            {"Clear Board"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" >
                Remove all tickets and comments?
            </DialogContentText>
            </DialogContent>
            <DialogActions>

              <div style={{marginBottom: 5}}>
                <Button onClick={clearBoard}><CheckOutlinedIcon/></Button>
                <Button onClick={handleClose}><ClearOutlinedIcon/></Button>
              </div>
            </DialogActions>
        </Dialog>
      );
    }


    return (
      <>

    
        <SaveDialog open={open} handleClose={handleClose}/>

        <ClearDialog open={openClear} handleClose={handleCloseClear}/>
        
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

          {!isSmallScreen &&
          <>
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
          </>
          }
        </div>


      </>
    );
}

export default ProjectBoard;
export { linkTickets, linkProject, linkDevlist, linkChangeCount };