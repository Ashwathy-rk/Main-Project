import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';

function Chat() {
   
   
    return (
        <div >
           
                <ChatEngine
                
                    height="100vh"
                    projectID="224e2d1e-4470-4ba8-b03c-35869ebe06df"
                    userName={'ashwathy'}
                    userSecret={'ashwathy'}
                    style={{color:'black'}}
                    
                />
           
        </div>
    );
   
}

export default Chat;