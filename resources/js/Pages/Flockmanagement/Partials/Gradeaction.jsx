import React, { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dotanimation from '../../../components/Dotanimation'
import Custominput from '../../../components/Custominput'
import Buttonsubmit from '../../../components/Buttonsubmit'
import Api from '../../../api/Api'

export default function Gradeaction(props) {
    const [quantity, setQuantity] = useState(null)
    const [productData, setProductData] = useState(null)
    const [errors,setErrors] = useState({})
    const [isLoadingData,setIsLoadingData] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [gradeList, setGradeList] = useState([])
    const [data, setData] = useState({
        'flock_control_id': null,
        'grading': [],
        'defected': 0
    })

    let GetProductData = () => {
        Api.get(`/grading/${props.id}/show`).then(res => {
            const { product, quantity } = res.data
            setQuantity(quantity)
            setData(cd=>cd={...cd,'flock_control_id':res.data.flock_control_id})
            setProductData(product[0])
            setIsLoadingData(false)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        if (productData?.definitions) {
            productData.definitions.forEach(function (value) {
                setGradeList(cd => cd = [...cd, { 'productsdefinition_id': value.id, 'name': value.name, 'quantity': '','description': 'from product grading' }])
            })
        }
    }, [productData])

    let AutoCalculateDefected = useMemo(() => {
        let Total = 0
        for (const { quantity } of gradeList) {
            Total += quantity
        }
        return quantity - Total
    }, [gradeList])


    let handleChange = (i, name, value) => {
        let newitems = [...gradeList];
        newitems[i][name] = value;
        setGradeList(newitems);
        setData(cv => cv = { ...cv, 'grading': gradeList })
    }

    useEffect(() => {
        GetProductData()
    }, [])


    let submit = () =>{
        if(data.defected >= 0 ){
            setProcessing(true)
            Api.post('/grading/update',data).then((res)=>{
                props.onSucess()
            }).catch(error=>{
                if(error && error?.response?.status == 422){
                    setErrors(error.response.data.errors)
                    setProcessing(false)
                }
            })
        }
    }
    useEffect(() => {
      console.log(errors)
    }, [errors])
    

    return (
        <div className=''>
            {isLoadingData && 
            <Dotanimation />
            }
            <nav className=' flex items-center bg-indigo-700/60 text-white p-3 px-5 gap-2 h-12 text-xl'>
                <span className='p-1 px-2 rounded-full flex items-center gap-1 border border-white text-xs'>
                    <FontAwesomeIcon icon='tag' /> <span>product</span>
                </span>
                <nav className='w-max p-1 '>
                    <span>{productData?.name ?? ''}</span>
                </nav>
            </nav>

            <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4 p-5  bg-indigo-50'>
                <FontAwesomeIcon icon="question-circle" />
                <span>The following types where defined for this products</span>
            </nav>
            <nav >
                <dt className=' max-w-md mx-auto p-1'>
                    <nav className='flex items-center flex-auto'>
                        <dl className='basis-full text-center'>Type</dl>
                        <dl className='basis-full text-center'>Qty Graded</dl>
                    </nav>
                    {Boolean(gradeList.length) && gradeList.map((definition, i) => {
                        return (<nav key={i} className='flex items-center gap-1 my-1 flex-auto'>
                            <Custominput readOnly={true} value={definition.name} getValue={() => void (0)} />
                            <Custominput error={errors[`grading.${i}.quantity`]} type="number" placeholder="enter quantity" getValue={(value) => handleChange(i, 'quantity', value)} />
                        </nav>)
                    })}

                    <nav className='flex items-center gap-1 my-1 flex-auto'>
                        <Custominput readOnly={true} type="text" value='defected' getValue={() => void (0)} />
                        <Custominput readOnly={true} error={(AutoCalculateDefected < 0) && 'values do not tally'} placeholder="enter quantity" type="number" number={AutoCalculateDefected} getValue={(value) => setData(cd => cd = { ...cd, 'defected': value })} />
                    </nav>

                    <nav className='flex items-center justify-end mt-10'>
                        <Buttonsubmit processing={processing} onClick={()=>submit()} text="grade" className=" w-full" />
                    </nav>
                </dt>

            </nav>

        </div>
    )
}
