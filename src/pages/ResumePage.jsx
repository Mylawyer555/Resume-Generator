import MultiStepForm from '../components/MultiStepForm'
import ResumePreview from '../components/ResumePreview'

const ResumePage = () => {
  return (
    
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 p-4'>
      <MultiStepForm/>
      <div className='bg-gray-100 shadow rounded-lg p-4 overflow-y-auto max-h-[90vh]'>
        <ResumePreview/> 
      </div>
    </div>
      
    
  )
}

export default ResumePage