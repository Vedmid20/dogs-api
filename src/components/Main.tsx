import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const dispatch = useDispatch();
const { dogs, loading, error } = useSelector((state: any) => state.dogs);


(() => {
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
      }  
});