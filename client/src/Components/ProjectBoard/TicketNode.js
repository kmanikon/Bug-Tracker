import React, { memo, useState } from "react";
import {
    NodeToolbar,
    Position,
    getConnectedEdges,
    useReactFlow,
    Handle
} from 'reactflow';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import { linkTickets } from './ProjectBoard';

export default memo(({ id, data, isConnectable }) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
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



    /*


    const navigate = useNavigate();

    const handleRouteChange = () => {

        navigate(
            '/ticketDetails',
            {state: { ticket: linkTickets[data.index], ticketNum: data.ticketNum, project: linkProject, devList: linkDevlist, changeCount: linkChangeCount, myTickets: true }}
        );
    }

    <Link 
        to="/ticketDetails"
        state={{ ticket: linkTickets[data.index], ticketNum: data.ticketNum, project: linkProject, devList: linkDevlist, changeCount: linkChangeCount, myTickets: true }}
    >
    */

    

    return (
        <>
            
            <div>
            
        
            <NodeToolbar
                isVisible={data.forceToolbarVisible || undefined}
                position={data.toolbarPosition}
                align="end"
            >
                <div style={{ display: 'flex', borderWidth: '10px', borderStyle: 'transparent', marginRight: -20, backgroundColor: 'white' }}>

                    {linkTickets && linkTickets.length > 0 &&
                        <Tooltip 
                            title={
                                <div style={{fontSize: 16, color: 'black', textAlign: 'center', padding: 5}}>
                                    {linkTickets[data.index].description}
                                </div>
                            } 
                            placement="top"
                            componentsProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: 'common.white',
                                    border: '1px solid grey'
                                  },
                                },
                              }}
                        >
                            <Button style={{ minWidth: 10, marginRight: 5 }} onClick={toggleDescription}>
                                <DescriptionOutlinedIcon className="icon-button" style={{ fontSize: '20px' }} />
                            </Button>
                            
                        </Tooltip>
                    }

                    <Tooltip title={<div style={{fontSize: 14, padding: 5}}>Delete</div>} placement="top">
                        <Button style={{ minWidth: 10 }} onClick={removeNode}>
                            <DeleteFilled className="icon-button" style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>
                </div>
            </NodeToolbar>

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

            <div className="react-flow__node-default">{data?.label}</div>
            </div>
            
        </>
    );
});

