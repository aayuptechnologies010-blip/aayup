export async function generateApplicationPDF(application: any) {
  // Create a simple HTML representation for PDF generation
  const content = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
          h2 { color: #3b82f6; margin-top: 30px; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; color: #666; }
          .value { margin-left: 10px; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
          .skill { background: #e0e7ff; padding: 5px 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Application for ${application.jobs?.title || 'Position'}</h1>
        
        <h2>Personal Information</h2>
        <div class="section">
          <div><span class="label">Name:</span><span class="value">${application.full_name}</span></div>
          <div><span class="label">Email:</span><span class="value">${application.email}</span></div>
          <div><span class="label">Phone:</span><span class="value">${application.phone}</span></div>
          <div><span class="label">Location:</span><span class="value">${application.current_location}</span></div>
          ${application.willing_to_relocate ? '<div><span class="label">Willing to relocate:</span><span class="value">Yes</span></div>' : ''}
        </div>

        <h2>Professional Details</h2>
        <div class="section">
          <div><span class="label">Current Position:</span><span class="value">${application.current_job_title}</span></div>
          <div><span class="label">Experience:</span><span class="value">${application.total_experience}</span></div>
          <div class="label">Skills:</div>
          <div class="skills">
            ${application.relevant_skills?.map((skill: string) => `<span class="skill">${skill}</span>`).join('') || ''}
          </div>
          ${application.linkedin_url ? `<div><span class="label">LinkedIn:</span><span class="value">${application.linkedin_url}</span></div>` : ''}
          ${application.portfolio_url ? `<div><span class="label">Portfolio:</span><span class="value">${application.portfolio_url}</span></div>` : ''}
        </div>

        <h2>Education</h2>
        <div class="section">
          <div><span class="label">Degree:</span><span class="value">${application.highest_degree}</span></div>
          <div><span class="label">University:</span><span class="value">${application.university}</span></div>
          <div><span class="label">Graduation:</span><span class="value">${application.graduation_year}</span></div>
        </div>

        ${application.cover_letter ? `
          <h2>Cover Letter</h2>
          <div class="section">
            <p>${application.cover_letter.replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}

        ${application.project_links && application.project_links.length > 0 ? `
          <h2>Project Links</h2>
          <div class="section">
            ${application.project_links.map((link: string) => `<div><a href="${link}">${link}</a></div>`).join('')}
          </div>
        ` : ''}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666;">
          <p>Application submitted on ${new Date(application.created_at).toLocaleString()}</p>
          <p>Resume: <a href="${application.resume_url}">Download Resume</a></p>
        </div>
      </body>
    </html>
  `;

  // Create a new window and print
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }
}
