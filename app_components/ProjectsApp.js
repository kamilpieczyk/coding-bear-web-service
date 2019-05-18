import styled from "styled-components";
import colors from "../styles/colors";
import {useState, useEffect} from "react";
import Router from "next/router";

const Container = styled.section`
    display: grid;
    grid-template-columns: 20% 80%;
    padding-top: 30px;
    height: 80vh;
    @media (max-width: 450px) {
        grid-template-columns: 30% 70%;
    }
`;

const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-right: 1px dotted ${colors.second};
    overflow: auto;
    height: 100%;
`;

const ProjectButton = styled.button`
    border: 1px solid ${colors.main};
    padding: 10px;
    color: ${colors.main};
    cursor: pointer;
    margin-bottom: 10px;
`;

const Content = styled.div`
    margin: 0 10%;
`;

const ProjectStatus = styled.div`
    width: 100%;
    background: ${colors.second};
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    div{
        width: ${props => props.progress};
        background: ${colors.third};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px 0;
        color: white;
    }
`;


const ProjectsApp = ({email, name}) => {
    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(0);

    const handleProjectDisplay = (index) => {
        setSelected(index);
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/9b859fee-242d-4e66-bde3-7febc4c77b95/get-projects',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email
            })
        })
        .then(res => res.json())
        .then(json => {
            const status = json.status;
            if(status === "ok") setProjects(json.projects);
        })
        .catch(err => Router.push("/500"))
    },[]);

    return(
        <Container>
            <Menu>
                {
                    projects.map( (project, index) => (
                        <ProjectButton key={project._id} onClick={() => handleProjectDisplay(index)}>
                            {project.title}
                        </ProjectButton>
                    ))
                }
            </Menu>

            <Content>
                {
                    projects[selected]
                        ? <>
                            <h1>Project {projects[selected].title}</h1>
                            <ProjectStatus progress={projects[selected].progress}>
                                <h2>you project status is now:</h2>
                                <p>{projects[selected].status}</p>
                                <div>{projects[selected].progress}</div>
                            </ProjectStatus>
                            <h2>Message:</h2>
                            <ProjectStatus>
                                {projects[selected].message}
                            </ProjectStatus>
                          </>
                        : null
                }
            </Content>
        </Container>
    )
}

export default ProjectsApp;