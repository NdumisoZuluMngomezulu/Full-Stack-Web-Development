function Rating ({ value }) {
    return (
        <span className="rating" title={`${value} out of 5`}>
            {'⭐'.repeat(value) + '☆'.repeat(5 - value)}
        </span>
    )
}

export default Rating