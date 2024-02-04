import React, { memo, useState } from "react";
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
import { styled } from '@mui/material/styles';
import { EditFilled, DeleteFilled, CloseOutlined } from '@ant-design/icons';
import { Button, Typography, Link } from '@material-ui/core';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SearchIcon from '@mui/icons-material/Search';

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


    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} arrow />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }));


    

    return (
        <>
            
            <div>
            
        
            <NodeToolbar
                isVisible={data.forceToolbarVisible || undefined}
                position={data.toolbarPosition}
                align="end"
            >
                <div style={{ display: 'flex', borderWidth: '10px', borderStyle: 'transparent', marginRight: -20, backgroundColor: 'white' }}>

                    {/*<LightTooltip title={<div className="description" ><Link style={{display: 'flex'}}><div style={{marginRight: 5}}>Details</div><OpenInNewIcon/></Link></div>} placement="top" fontSize={30}
                    >*/}

                    <Tooltip title={'details'} placement="top">
                        {/*
                        <Link to="/ticketDetails" 
                            //state={{ ticket: ticket, ticketNum: ticketNum, project: project, devList: devList, changeCount: changeCount, myTickets: myTickets  }} 
                            //>style={{ textDecoration: 'none' }}
                        >
                            <Button style={{ minWidth: 10, marginRight: 5 }} onClick={toggleDescription}>
                                <SearchIcon className="icon-button" style={{ fontSize: '24px' }} />
                            </Button>
                        </Link>
                        */}
                        <Button style={{ minWidth: 10, marginRight: 5 }} onClick={toggleDescription}>
                            <SearchIcon className="icon-button" style={{ fontSize: '24px' }} />
                        </Button>
                    </Tooltip>

                    <Tooltip title={'edit'} placement="top">
                        <Button style={{ minWidth: 10, marginRight: 5 }} onClick={toggleDescription}>
                            <EditFilled className="icon-button" style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>

                    <Tooltip title={'delete'} placement="top">
                        <Button style={{ minWidth: 10 }} onClick={removeNode}>
                            <DeleteFilled className="icon-button" style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>
                </div>
            </NodeToolbar>

            <Handle
                type="source"
                id={topid}
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                id={botid}
                position={Position.Bottom}
                isConnectable={isConnectable}
            />

            <div className="react-flow__node-default">{data?.label}</div>
            </div>
            
        </>
    );
});