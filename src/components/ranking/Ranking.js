import React, { useState, useEffect } from "react";
import "./ranking.css";
import Navbar from "../firstpage/Navbar";

const RankingPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/api/rankings");
                if (!response.ok) throw new Error("Failed to fetch rankings");
                
                const data = await response.json();
                
                // Sort users by correct answers (if not already sorted by backend)
                const sortedUsers = data.sort((a, b) => b.correctAnswers - a.correctAnswers);
                
                // Add rank property based on position
                const rankedUsers = sortedUsers.map((user, index) => ({
                    ...user,
                    rank: index + 1
                }));
                
                setUsers(rankedUsers);
                setError(null);
            } catch (error) {
                console.error("Error fetching rankings:", error);
                setError("Failed to load rankings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    return (
        <>
            <Navbar />
            <div className="ranking-container">
                <h2>User Rankings</h2>
                
                {loading && <p>Loading rankings...</p>}
                {error && <p className="error-message">{error}</p>}
                
                {!loading && !error && (
                    <table className="ranking-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Correct Answers</th>
                                <th>Total Questions</th>
                                <th>Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id || user._id}>
                                    <td>{user.rank}</td>
                                    <td>{user.name}</td>
                                    <td>{user.correctAnswers}</td>
                                    <td>{user.totalQuestions}</td>
                                    <td>{user.totalQuestions > 0 ? 
                                        `${((user.correctAnswers / user.totalQuestions) * 100).toFixed(1)}%` : 
                                        '0%'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                
                {!loading && !error && users.length === 0 && (
                    <p>No rankings available yet.</p>
                )}
            </div>
        </>
    );
};

export default RankingPage;