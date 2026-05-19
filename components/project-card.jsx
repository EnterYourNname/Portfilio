function ProjectCard({ project }) {
  const isPlaceholder = !project.cover;

  return (
    <a className="pk-project-card" href={project.href}>
      <div
        className="pk-project-card-img"
        style={!isPlaceholder ? { backgroundImage: `url('${project.cover}')` } : {}}
      >
        {isPlaceholder && (
          <div className="pk-project-card-placeholder">
            <span>Coming soon</span>
          </div>
        )}
      </div>
      <div className="pk-project-card-body">
        <span className="pk-project-card-tags">{project.meta}</span>
        <span className="pk-project-card-title">{project.title}</span>
      </div>
    </a>
  );
}

Object.assign(window, { ProjectCard });
