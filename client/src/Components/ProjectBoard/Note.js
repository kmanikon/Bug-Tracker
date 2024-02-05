import React, { memo, useState } from "react";
import Divider from '@mui/material/Divider';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Button, TextField, Typography } from '@material-ui/core';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { EditFilled, DeleteFilled, CloseOutlined } from '@ant-design/icons';
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
    useReactFlow
} from 'reactflow';

export default memo(({ id, data, isConnectable }) => {

    const [editDesc, setEditDesc] = useState(false);

    const [newDesc, setNewDesc] = useState('');


    const closeDescription = () => {
        setEditDesc(false);
    }

    const saveDescription = () => {
        if (data?.editNote){
            data?.editNote(id, newDesc);
        }
        setEditDesc(false);
    }


    const toggleDescription = () => {
        if (editDesc == false) {
            setNewDesc(data?.description);
        }
        setEditDesc(!editDesc);
    };

    const {
        getNode,
        getNodes,
        getEdges,
        setEdges,
        deleteElements
    } = useReactFlow();

    const topid = "top" + id;
    const botid = "bot" + id;
    const leftid = "left" + id;
    const rightid = "right" + id;

    const removeNode = () => {
        const node = getNode(id);

        if (!node) {
            return;
        }

        const nodes = getNodes();
        const edges = getEdges();

        const connectedEdges = getConnectedEdges([node], edges);

        deleteElements({ nodes: [node], edges: connectedEdges });
    };
    
    return (
        <>
            
            <div>
                <div className="noteCard">
                <NodeToolbar
                    isVisible={data.forceToolbarVisible || undefined}
                    position={data.toolbarPosition}
                    align="end"
                >
                    <div style={{ display: 'flex', borderWidth: '10px', borderStyle: 'transparent', marginRight: -20, backgroundColor: 'white' }}>

                        <Tooltip title={'Edit'} placement="top">
                            <Button style={{ minWidth: 10, marginRight: 5 }} onClick={toggleDescription}>
                                <EditFilled className="icon-button" style={{ fontSize: '20px' }} />
                            </Button>
                            
                        </Tooltip>

                        <Tooltip title={'Delete'} placement="top">
                            <Button style={{ minWidth: 10 }} onClick={removeNode}>
                                <DeleteFilled className="icon-button" style={{ fontSize: '20px' }} />
                            </Button>
                        </Tooltip>
                    </div>
                </NodeToolbar>


                    <div style={{display: 'flex'}}>
                        <InsertCommentOutlinedIcon className="commentIcon"
                        />

                        <div className="commentText">
                            {editDesc === false ?
                            <>
                                {data?.description}
                            </>
                            :
                            <>
                                <>
                                <TextField
                                    className="commentText"
                                    onChange={(e) => setNewDesc(e.target.value)}  
                                    value={newDesc} 
                                    label="Edit Comment"
                                    variant="outlined"
                                    size="small"
                                    InputLabelProps={{style: {fontSize: 12}}}
                                    inputProps={{style: {fontSize: 12}}}
                                    multiline
                                    minRows={1}
                                />
                                    <div style={{marginLeft: 'auto', marginRight: '5px', marginTop: '5px'}}>
                                        <div style={{ display: 'flex'}}>
                                            <Button 
                                                style={{ minWidth: 10 }} 
                                                onClick={saveDescription}
                                            >
                                                <CheckOutlinedIcon style={{fontSize: 12}}/>
                                            </Button>
                                            <Button 
                                                style={{ minWidth: 10 }} 
                                                onClick={closeDescription}
                                            >
                                                <ClearOutlinedIcon style={{fontSize: 12}}/>
                                            </Button>
                                        </div>
                                    </div>
                                </>
                    
                            </>
                            }
                        </div>
                    </div>

                    <Handle
                        style={{width: '100%', opacity: 0}}
                        type="source"
                        id={topid}
                        position={Position.Top}
                        isConnectable={isConnectable}
                    />
                    <Handle
                        style={{width: '100%', opacity: 0}}
                        type="source"
                        id={botid}
                        position={Position.Bottom}
                        isConnectable={isConnectable}
                    />
                    <Handle
                        style={{height: '100%', opacity: 0}}
                        type="source"
                        id={leftid}
                        position={Position.Left}
                        isConnectable={isConnectable}
                    />
                    <Handle
                        style={{height: '100%', opacity: 0}}
                        type="source"
                        id={rightid}
                        position={Position.Right}
                        isConnectable={isConnectable}
                    />
                </div>
            </div>
            
        </>
    );
});
