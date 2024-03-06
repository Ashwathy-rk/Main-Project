import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';

function Chat1() {
   
   
    return (
        <div >
           
                <ChatEngine
                
                    height="100vh"
                    projectID="224e2d1e-4470-4ba8-b03c-35869ebe06df"
                    userName={'binish'}
                    userSecret={'binish'}
                    style={{color:'black'}}
                    
                />
           
        </div>
    );
   
}

export default Chat1;