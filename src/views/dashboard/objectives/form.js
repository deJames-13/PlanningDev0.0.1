import ResourceForm from '../components/ResourceForm'
import * as formSchema from './form-schema'

export default function ObjectiveForm() {


    return (
        <div>
            <ResourceForm
                resource={'objectives'}
                title={'Quality Objectives Form'}
                subtitle={'Fill out necessary input for the report'}
                form={formSchema}
            />

        </div>

    )
}
