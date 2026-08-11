import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";
// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  console.log("Redux allJobs:", allJobs);
  console.log("Redux length:", allJobs.length);
  console.log("searchedQuery:", searchedQuery);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    console.log("Filter useEffect running");
    console.log("Current searchedQuery:", searchedQuery);
    console.log("Current allJobs:", allJobs);
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        // Industry filters
        if (
          searchedQuery === "Frontend Developer" ||
          searchedQuery === "Backend Developer" ||
          searchedQuery === "FullStack Developer"
        ) {
          return job.title === searchedQuery;
        }

        // Location filters
        if (
          searchedQuery === "Delhi NCR" ||
          searchedQuery === "Bangalore" ||
          searchedQuery === "Hyderabad" ||
          searchedQuery === "Pune" ||
          searchedQuery === "Mumbai" ||
          searchedQuery === "Noida"
        ) {
          return job.location === searchedQuery;
        }

        // Salary filters
        if (searchedQuery.includes("-")) {
          const [min, max] = searchedQuery.split("-").map(Number);
          return job.salary >= min && job.salary <= max;
        }

        // Search bar
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      filteredJobs.forEach((job) => {
        console.log(
          "TITLE:",
          job.title,
          "| LOCATION:",
          job.location,
          "| SALARY:",
          job.salary,
        );
      });
      console.log("Filtered Length:", filteredJobs.length);
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  console.log("Rendering Jobs:", filterJobs.length);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
