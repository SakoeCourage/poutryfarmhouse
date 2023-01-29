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
        'remainder_description': null,
        'remainder_quantity': null
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


    let AutoCheckAnomality = useMemo(() => {
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
        useEffect(() => {
        if (productData?.definitions) {
            productData.definitions.forEach(function (value) {
                setGradeList(cd => cd = [...cd, { 'productsdefinition_id': value.id, 'name': value.name, 'quantity': '','description': 'from product grading' }])
            })
        }
    }, [productData])


    let submit = () =>{
      
            setProcessing(true)
            Api.post('/grading/update',data).then((res)=>{
                props.onSucess()
            }).catch(error=>{
                console.log(error.response)
                if(error && error?.response?.status == 422){
                    setErrors(error.response.data.errors)
                    setProcessing(false)
                }
            })
    }
    useEffect(() => {
      console.log(data)
    }, [data])
    
    return (
        <div className='min-h-full'>
            {isLoadingData && 
            <Dotanimation />
            }
            <nav className='flex items-center justify-between bg-indigo-700/60 text-white p-3 px-5 gap-2 h-12 text-xl'>
                <nav className='flex items-center gap-1'>
                <span className='p-1 px-2 rounded-full flex items-center gap-1 border border-white text-xs'>
                    <FontAwesomeIcon icon='tag' /> <span>product</span>
                </span>
                <nav className='w-max p-1 '>
                    <span>{productData?.name ?? ''}</span>
                </nav>
                </nav>
                <nav className='text-sm'>
                    {quantity && <nav className='text-xs'>
                         <span className='font-bold'>{quantity} </span> items collected from flock control
                    </nav> }
                </nav>
            </nav>

            <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4 p-5  bg-indigo-50'>
                <FontAwesomeIcon icon="question-circle" />
                <span>The following types where defined for this products</span>
            </nav>
            <nav >
                <nav className=' max-w-md mx-auto p-1'>
                    <nav className='flex items-center flex-auto'>
                        <nav className='basis-full text-center'>Grade</nav>
                        <nav className='basis-full text-center'>Qty </nav>
                    </nav>
                    {Boolean(gradeList.length) && gradeList.map((definition, i) => {
                        return (<nav key={i} className='flex items-center gap-1 my-1 flex-auto'>
                            <Custominput readOnly={true} value={definition.name} getValue={() => void (0)} />
                            <Custominput error={errors[`grading.${i}.quantity`]} type="number" placeholder="enter quantity" getValue={(value) => handleChange(i, 'quantity', value)} />
                        </nav>)
                    })}

                    {/* <nav className='flex items-center gap-1 my-1 flex-auto'>
                        <Custominput readOnly={true} type="text" value='defected' getValue={() => void (0)} />
                        <Custominput readOnly={true} error={(AutoCheckAnomality < 0) && 'values do not tally'} placeholder="enter quantity" type="number" number={AutoCheckAnomality} getValue={(value) => setData(cd => cd = { ...cd, 'defected': value })} />
                    </nav> */}

                    <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4 p-5  bg-indigo-50'>
                           State  if any remainder where found
                    </nav>
                       <nav className='flex items-center gap-1 my-1 flex-auto'>
                        <Custominput  type="text" placeholder='enter description' error={errors['remainder_description']} getValue={(value) => setData(cd => cd = { ...cd, 'remainder_description': value })} />
                        <Custominput   placeholder="enter quantity" type="number" disabled={true} number={AutoCheckAnomality}  getValue={(value) => setData(cd => cd = { ...cd, 'remainder_quantity': value })} />
                    </nav>
                    {/* {AutoCheckAnomality < 0 &&
                    <nav className='text-red-600 text-sm flex items-center gap-1 mb-4 p-5  bg-red-50 mt-10'>
                            entries exceeds amount recorded from flock control
                    </nav>
                    } */}
                  
                    <nav className='flex items-center justify-end mt-10'>
                        <Buttonsubmit processing={processing} onClick={()=>submit()} text="grade" className=" w-full" />
                    </nav>
                </nav>

            </nav>

        </div>
    )
}
