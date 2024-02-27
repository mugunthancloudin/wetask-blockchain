import React, { useState } from 'react';
import axios from 'axios';

function CampaignJoin() {
  const [cid, setCid] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://ipfs.moralis.io:2053/ipfs/${cid}`);
      const data = response.data;
      const modifiedTasks = data.map(task => {
        if (task.taskNumber === 1) {
          const tweetId = task.value.match(/\/(\d+)$/)[1];
          task.value = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;
        } else if (task.taskNumber === 2) {
          const username = task.value.match(/\/(\w+)$/)[1];
          task.value = `https://twitter.com/intent/follow?screen_name=${username}`;
        } else if (task.taskNumber === 3) {
          const tweetId = task.value.match(/\/(\d+)$/)[1];
          task.value = `https://twitter.com/intent/like?tweet_id=${tweetId}`;
        }
        return task;
      });
      setTasks(modifiedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={cid} 
        onChange={e => setCid(e.target.value)} 
        placeholder="Enter CID"
      />
      <button onClick={fetchTasks}>Fetch Tasks</button>
      <ul>
        {tasks.map(task => (
          <li key={task.taskNumber}>
            <strong>Task Number:</strong> {task.taskNumber}<br />
            <strong>Task Title:</strong> {task.taskTitle}<br />
            <strong>Value:</strong> <a href={task.value} target="_blank" rel="noopener noreferrer">{task.value}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignJoin;
