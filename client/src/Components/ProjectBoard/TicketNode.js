import React, { memo } from "react";
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
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button } from '@material-ui/core';

export default memo(({ id, data, isConnectable }) => {
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
            <NodeToolbar
                isVisible={data.forceToolbarVisible || undefined}
                position={data.toolbarPosition}
                align="end"
            >
            <div style={{display: 'flex', borderWidth: '10px', borderStyle: 'transparent', marginRight: -20 }}>
                <Button style={{minWidth: 10, marginRight: 5}}><EditFilled className="icon-button" style={{ fontSize: '20px' }}/></Button>
                <Button style={{minWidth: 10}} onClick={removeNode}><DeleteFilled className="icon-button" style={{ fontSize: '20px' }}/></Button>
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
});