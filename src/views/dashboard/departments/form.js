import ResourceForm from '../components/ResourceForm'
import * as formSchema from './form-schema'

export default function DepartmentForm() {


    return (
        <div>
            <ResourceForm
                resource={'departments'}
                title={'Department Form'}
                subtitle={'Fill out necessary input for the report'}
                form={formSchema}
            />
        </div>
    )
}
