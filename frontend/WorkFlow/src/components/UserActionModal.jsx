import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaEnvelope, FaListUl, FaUser, FaCalendarAlt, FaUserShield } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const UserActionModal = ({ user, onClose }) => {
  const { name, email, _id, year, rollNo, createdAt, profileImageUrl } = user;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.TASKS.GET_TASKS_BY_USER(_id));
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    };

    fetchUserTasks();
  }, [_id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900/95 p-6 rounded-2xl border border-indigo-500/30 w-full max-w-md shadow-xl"
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          User Actions
        </h2>

        {/* User Details */}
        <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 mb-5">
          <img
            src={
              profileImageUrl ||
              "https://img.lovepik.com/png/20231027/Dark-gray-simple-avatar-grey-silhouette-placeholder_369196_wh860.png"
            }
            className="w-16 h-16 rounded-full border border-indigo-400/50 object-cover"
          />

          <div>
            <p className="text-lg font-semibold text-indigo-200">{name}</p>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <FaEnvelope /> {email}
            </p>
          </div>
        </div>

        {/* Additional Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <UserMeta label="Year" value={year} icon={FaUser} />
          <UserMeta label="Roll No." value={rollNo} icon={FaUser} />
          <UserMeta
            label="Joined"
            value={createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
            icon={FaCalendarAlt}
          />
        </div>

        {/* Email Button */}
        <button
          onClick={() => (window.location.href = `mailto:${email}`)}
          className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl mb-4 transition"
        >
          <FaEnvelope /> Send Email
        </button>

        {/* Assigned Tasks */}
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/40 max-h-60 overflow-y-auto custom-scroll">
          <h3 className="text-slate-300 font-semibold mb-2 flex items-center gap-2">
            <FaListUl /> Assigned Tasks
          </h3>

          {tasks.length === 0 ? (
            <p className="text-slate-500">No tasks assigned.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="p-3 rounded-lg bg-slate-900/40 border border-slate-700/40 text-slate-200 flex justify-between items-center"
                >
                  <span>{task.title}</span>

                  {/* Status Badge */}
                  <span
                    className={`text-xs px-2 py-1 rounded-md 
                      ${
                        task.status === "Pending"
                          ? "bg-amber-500/20 text-amber-300"
                          : task.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }
                    `}
                  >
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl w-full"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

/* USER META SUBCOMPONENT */
const UserMeta = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-2 bg-slate-900/40 p-3 rounded-lg border border-slate-700/40">
    <Icon className="text-indigo-300" />
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm text-slate-200 font-semibold">{value || "—"}</p>
    </div>
  </div>
);

export default UserActionModal;
