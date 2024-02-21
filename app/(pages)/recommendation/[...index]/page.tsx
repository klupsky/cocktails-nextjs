import Recommendation from '../../../components/Recommendation/clientComponent';

interface TParams {
  params: {
    index: string[];
  };
}

export default async function Page({ params }: TParams) {
  console.log(params.index);
  const encodedParams = params.index[0];
  const decodedParams = encodedParams.replace(/%3D/g, '=').replace(/%26/g, '&');
  console.log(decodedParams, 'decodedParams');
  const paramsArray = decodedParams.split('&');
  const [flavour, spirit, level] = paramsArray.map(
    (param: string) => param.split('=')[1],
  );

  return (
    <main>
      hi
      <Recommendation />
    </main>
  );
}
