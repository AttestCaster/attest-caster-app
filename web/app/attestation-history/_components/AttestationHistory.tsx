import { clsx } from 'clsx';

export default function AttestationHistory({historyRows = []}) {
  console.log('historyRows', historyRows)
  // const { memos, refetchMemos } = useOnchainCoffeeMemos();

  if (historyRows.length === 0) {
    return <></>
  }
  const rows = []
  console.log('process.env.SIGN_SCAN_URL', process.env.SIGN_SCAN_URL)
  console.log('historyRows.length', historyRows, historyRows)
  if (historyRows.length !== 0) {
    for (const row of historyRows) {
      console.log('row', row)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const data = JSON.parse(row.data)
      const tdClass = clsx([
        'rounded-lg border border-solid border-boat-color-palette-line',
        'p-1'
      ])
      rows.push(<tr className="rounded-lg border border-solid border-boat-color-palette-line">
        <td className={tdClass}>
          <a href={`${process.env.NEXT_PUBLIC_SIGN_SCAN_URL}/attestation/${row.id}`} target="_blank" >
            {row.id}
          </a>
        </td>
        <td className={tdClass}>{new Date(row.attestTimestamp * 1).toUTCString()}</td>
        {/* <td className={tdClass}>{row.schemaId}</td> */}
        {/* <td className={tdClass}>{row.attester}</td> */}
        <td className={tdClass}>{data.castHash}</td>
        <td className={tdClass}>{data.authorFID}</td>
      </tr>)
    }
  }
  return (
    <div
      className={clsx([
        'grid grid-cols-1 items-stretch justify-start',
        'md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg',
      ])}
    >
      <section
        className={clsx([
          'rounded-lg border border-solid border-boat-color-palette-line',
          'bg-boat-color-palette-backgroundalternate p-10',
        ])}
      >
        <h2 className="mb-5 w-fit text-2xl font-semibold text-white">Attestation History</h2>

        {/* {memos?.length > 0 && <Memos memos={memos} />} */}
        
        <div className="gap-16 lg:flex">
          <table id='attestation-history' className="rounded-lg border w-full">
            <thead>
              <tr>
                <th>Attestation ID</th>
                <th>Attest Time</th>
                {/* <th>SchemaId</th> */}
                {/* <th>Attester</th> */}
                <th>Cast Hash</th>
                <th>Cast Author</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </section>
      {/* <aside>
        <div
          className={clsx([
            'mt-10 rounded-lg border border-solid border-boat-color-palette-line',
            'bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
          ])}
        >
          <FormBuyCoffee refetchMemos={refetchMemos} />
        </div>
      </aside> */}
    </div>
  );
}
